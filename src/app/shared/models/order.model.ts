import { Product } from "./product.model";

export interface Order {
  OrderId: number;
  OrderDate: string;
  UserId: string;
  Products: Product[];
  PaymentType: string;
  TotalPrice?: number;
}
