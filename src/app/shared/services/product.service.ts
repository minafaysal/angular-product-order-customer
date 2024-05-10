import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

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
}
