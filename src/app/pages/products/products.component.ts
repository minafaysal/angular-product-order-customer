import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Call method to fetch products when component initializes
    this.getProducts();
  }
  // Method to fetch products from ProductService
  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }
}
