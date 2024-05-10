import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { ComponentBase } from '../../shared/base/common.base';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends ComponentBase implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
      super();
  }

  ngOnInit(): void {
    // Call method to fetch products when component initializes
    this.getProducts();
  }
  // Method to fetch products from ProductService
  getProducts(): void {
     this.productService
       .getProducts()
       .pipe(takeUntil(this.destroy$)) 
       .subscribe((products) => {
         this.products = products;
       });
  }

  // TrackBy function to improve rendering performance
  trackByProductId(index: number, product: Product): number {
    return product.ProductId;
  }
}
