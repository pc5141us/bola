export type ProductCategory = 
  | 'laptops' 
  | 'motherboards' 
  | 'cables' 
  | 'storage' 
  | 'chargers';

export type ProductCondition = 'new' | 'imported'; // جديد أو استيراد فرز أول

export interface TechnicalSpec {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  partNumber: string; // رقم القطعة / الموديل للبحث الدقيق
  category: ProductCategory;
  categoryName: string;
  price: number;
  salePrice?: number;
  condition: ProductCondition;
  stock: number;
  lowStockThreshold: number; // تنبيه عند كمية محددة
  description: string;
  mainImage: string;
  images: string[];
  specs: TechnicalSpec[];
  compatibility: string[]; // قائمة التوافق مع الأجهزة
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'vodafone_cash' | 'card';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  whatsappPhone?: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  trackingNumber: string;
  customer: OrderCustomer;
  items: CartItem[];
  totalAmount: number;
  shippingFee: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  searchQuery: string;
  partNumberQuery: string;
  category: string;
  condition: string;
  minPrice: number;
  maxPrice: number;
  specFilterKey: string;
  specFilterValue: string;
  inStockOnly: boolean;
  sortBy: 'latest' | 'price_low' | 'price_high' | 'best_selling';
}
