'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, CartItem, OrderCustomer, PaymentMethod, OrderStatus, FilterState } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '@/data/initialProducts';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[];
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
  
  // Filter state
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Admin Actions
  addProduct: (newProduct: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (updated: Product) => void;
  deleteProduct: (productId: string) => void;
  adjustStock: (productId: string, delta: number) => void;
  lowStockProducts: Product[];
  
  // Order Actions
  createOrder: (customer: OrderCustomer, paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  const initialFilters: FilterState = {
    searchQuery: '',
    partNumberQuery: '',
    category: 'all',
    condition: 'all',
    minPrice: 0,
    maxPrice: 50000,
    specFilterKey: 'all',
    specFilterValue: '',
    inStockOnly: false,
    sortBy: 'latest'
  };

  const [filterState, setFilterState] = useState<FilterState>(initialFilters);

  const resetFilters = () => {
    setFilterState(initialFilters);
  };

  // Sync state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('technohub_products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
      const savedOrders = localStorage.getItem('technohub_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      const savedCart = localStorage.getItem('technohub_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem('technohub_wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (err) {
      console.error('Error loading from LocalStorage:', err);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('technohub_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('technohub_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('technohub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('technohub_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      } else {
        return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => {
    const activePrice = item.product.salePrice ?? item.product.price;
    return acc + activePrice * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Low stock products alert
  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);

  // Admin Product CRUD
  const addProduct = (newProduct: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>) => {
    const created: Product = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [created, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProductDetail?.id === updated.id) {
      setSelectedProductDetail(updated);
    }
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (selectedProductDetail?.id === productId) {
      setSelectedProductDetail(null);
    }
  };

  const adjustStock = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  // Orders
  const createOrder = (customer: OrderCustomer, paymentMethod: PaymentMethod): Order => {
    const orderIdNumber = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ORD-${orderIdNumber}`,
      trackingNumber: `TH-2026-${orderIdNumber}`,
      customer,
      items: [...cart],
      totalAmount: cartTotal,
      shippingFee: 60,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Deduct stock for ordered items
    setProducts((prev) =>
      prev.map((prod) => {
        const cartMatch = cart.find((item) => item.product.id === prod.id);
        if (cartMatch) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartMatch.quantity)
          };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
      )
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        wishlist,
        isAdminOpen,
        setIsAdminOpen,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductDetail,
        setSelectedProductDetail,
        filterState,
        setFilterState,
        resetFilters,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        toggleWishlist,
        isInWishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        lowStockProducts,
        createOrder,
        updateOrderStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
