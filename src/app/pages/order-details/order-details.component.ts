import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../../shared/base/common.base';
import { ProductService } from '../../shared/services/product.service';
import { OrdersService } from '../../shared/services/order.service';
import { Order } from '../../shared/models/order.model';
import { Customer } from '../../shared/models/user.model';
import { CustomerService } from '../../shared/services/customer.service';
import { Product } from '../../shared/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent extends ComponentBase implements OnInit {
  orderId!: number;
  selectedOrder!: Order | null;
  customer!: Customer | undefined;
  products!: Product[];
  private subscriptions: Subscription[] = [];
  constructor(
    private productService: ProductService,
    private readonly orderService: OrdersService,
    private readonly customerService: CustomerService
  ) {
    super();
  }

  ngOnInit(): void {
    // Call method to fetch selected order details
    this.getSelectedOrder();
  }

  // Fetch order details and customer details based on orderId
  getSelectedOrder() {
    // Subscribe to selectedOrder$ to get the selected order
    const orderSubscription = this.orderService.selectedOrder$.subscribe(
      (order) => {
        this.selectedOrder = order;
      }
    );
    this.subscriptions.push(orderSubscription);

    if (this.selectedOrder) {
      // Fetch customer details based on the order's UserId
      const customerSubscription = this.customerService
        .getCustomerDetails(this.selectedOrder.UserId)
        .subscribe((customer) => {
          this.customer = customer;
        });
      this.subscriptions.push(customerSubscription);

      // Fetch products related to the selected order
      const productsSubscription = this.productService
        .getProductsForOrder(this.selectedOrder.Products)
        .subscribe((products) => {
          this.products = products;
        });
      this.subscriptions.push(productsSubscription);
    }
  }

  // Unsubscribe from all subscriptions in the subscriptions array
  override ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
