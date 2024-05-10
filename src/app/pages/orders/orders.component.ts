import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../shared/base/common.base';
import { Order } from '../../shared/models/order.model';
import { OrdersService } from '../../shared/services/order.service';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends ComponentBase implements OnInit {
  orders: Order[] = [];

  constructor(
    private ordersService: OrdersService
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
      });
  }
  // Track orders by OrderId for optimization in ngFor
  trackByOrderId(index: number, order: Order): number {
    return order.OrderId;
  }
}
