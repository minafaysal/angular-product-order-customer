import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product, orderProducts } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { ComponentBase } from '../../shared/base/common.base';
import { takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderPopupComponent } from '../add-order-popup/add-order-popup.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends ComponentBase implements OnInit {
  products: Product[] = [];
  quantityValues: { [key: number]: number } = {};
  selectedProducts: orderProducts[] = [];
  createOrder: boolean = false;

  constructor(
    private productService: ProductService,
    private readonly toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
     this.spinner.show();
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
      this.spinner.hide();
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

  // Method to open add order popup
  openAddOrderPopup(): void {
    const dialogRef = this.dialog.open(AddOrderPopupComponent, {
      width: '500px',
      data: this.selectedProducts,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  createNewOrder(): void {
    this.createOrder = true;
  }

  // Method to add or remove product to order
  addOrRemoveProduct(product: any) {
    const productIndex = this.selectedProducts.findIndex(
      (p) => p.ProductId === product.ProductId
    );

    if (productIndex !== -1) {
      // Product already exists in the order, remove it
      this.selectedProducts.splice(productIndex, 1);
      this.toastr.error('Product removed from order Successfull!');
    } else {
      // Product doesn't exist, add it to the order
      this.selectedProducts.push({
        ProductId: product.ProductId,
        Quantity: product.AvailablePieces,
      });
      this.toastr.success('Product added to order Successfull!');
    }
  }
  // Method to check if product is added to order
  isProductAdded(productId: number): boolean {
    return this.selectedProducts.some(
      (product) => product.ProductId === productId
    );
  }
}
