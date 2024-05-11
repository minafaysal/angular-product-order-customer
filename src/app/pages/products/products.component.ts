import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { ComponentBase } from '../../shared/base/common.base';
import { takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends ComponentBase implements OnInit {
  products: Product[] = [];
  quantityValues: { [key: number]: number } = {};

  constructor(
    private productService: ProductService,
    private readonly toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
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

  // Method to edit product quantity
  editProductQuantity(productId: number, newQuantity: number) {
    const productToUpdate = this.products.find(
      (product) => product.ProductId === productId
    );
    if (productToUpdate && productToUpdate?.AvailablePieces == newQuantity) {
      this.toastr.info(' the new product quantity is same as old !');
      return;
    }

    if (productToUpdate) {
      const updatedProduct = {
        ...productToUpdate,
        AvailablePieces: newQuantity,
      };
      this.productService
        .updateProductQuantity(productId, updatedProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (response) => {
            this.toastr.success(' Product quantity updated  Successfull !');
            this.products = response;
            // Trigger change detection
            this.cdr.detectChanges();
          },
          (error) => {
            this.toastr.warning(' Error updating product quantity !');
          }
        );
    } else {
      this.toastr.warning(' Product not found!');
    }
  }
}
