export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem extends ServiceItem {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Diagnosing' | 'Repairing' | 'Ready' | 'Completed';
  items: ServiceItem[];
  total: number;
}

export enum ViewState {
  MENU = 'MENU',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
  AI_DIAGNOSE = 'AI_DIAGNOSE'
}

export interface UserProfile {
  name: string;
  phone: string;
  avatarUrl: string;
}