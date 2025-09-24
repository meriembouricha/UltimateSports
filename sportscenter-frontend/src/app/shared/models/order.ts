export interface OrderItem {
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface Order {
  id: number;
  stripeSessionId: string;
  deliveryStatus: string;
  totalAmount: number;
  shippingPrice: number;
  items: OrderItem[];
  userId: number;
  username: string;
  userEmail: string;
  isLoading?: boolean;
}
