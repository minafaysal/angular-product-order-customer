import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'assets/data/porducts.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductPrice(productId: number): Observable<number> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map((products) => {
        const product = products.find((p) => p.ProductId === productId);
        return product ? product.ProductPrice : 0;
      })
    );
  }

  getProductsForOrder(orderProducts: Product[]): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map((products) => {
        const orderProductIds = orderProducts.map(
          (orderProduct) => orderProduct.ProductId
        );
        return products.filter((product) =>
          orderProductIds.includes(product.ProductId)
        );
      })
    );
  }

  
}
