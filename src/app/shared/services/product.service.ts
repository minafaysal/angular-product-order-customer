import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

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

  updateProductQuantity(
    productId: number,
    updatedProduct: Product
  ): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map((products) => {
        const updatedProducts = products.map((product) => {
          if (product.ProductId === productId) {
            return { ...product, ...updatedProduct };
          }
          return product;
        });
        return updatedProducts;
      })
    );
  }
}