import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../shared/base/common.base';
import { Order } from '../../shared/models/order.model';
import { OrdersService } from '../../shared/services/order.service';
import { takeUntil } from 'rxjs';
import { ProductService } from '../../shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends ComponentBase implements OnInit {
  orders: Order[] = [];
  visibleOrders: Order[] = [];
  itemsPerPage = 20;

  constructor(
    private ordersService: OrdersService,
    private productService: ProductService,
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    // Fetch orders when the component initializes
    this.getOrders();
  }

  // Fetch orders from the service
  getOrders(): void {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe((orders) => {
        this.orders = orders;
        this.loadOrdersDetails();
        this.loadVisibleOrders();
      });
  }

  // Load additional details for each order (total price)
  loadOrdersDetails(): void {
    for (const order of this.orders) {
      let totalPrice = 0;
      for (const product of order.Products) {
        this.productService
          .getProductPrice(product.ProductId)
          .subscribe((price) => {
            totalPrice += price;
            order.TotalPrice = totalPrice;
          });
      }
    }
  }

  // Load the initial set of visible orders based on itemsPerPage
  loadVisibleOrders(): void {
    this.visibleOrders = this.orders.slice(0, this.itemsPerPage);
  }

  // Load more orders when the "Load More" button is clicked
  loadMore(): void {
    const startIndex = this.visibleOrders.length;
    const endIndex = startIndex + this.itemsPerPage;
    const additionalOrders = this.orders.slice(startIndex, endIndex);
    this.visibleOrders.push(...additionalOrders);
  }

  // Track orders by OrderId for optimization in ngFor
  trackByOrderId(index: number, order: Order): number {
    return order.OrderId;
  }

  // Function to handle viewing order details
  viewOrderDetails(order: Order): void {
    this.ordersService.setSelectedOrder(order);
    this.router.navigate(['/orderdetails', order.OrderId]);
  }
}
