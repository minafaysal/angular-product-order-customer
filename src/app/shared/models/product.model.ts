export interface Product {
  ProductId: number;
  ProductName: string;
  ProductPrice: number;
  AvailablePieces: number;
  ProductImg: string;
  Quantity?: number;
}

export interface orderProducts {
  ProductId: number;
  Quantity: number;
}
