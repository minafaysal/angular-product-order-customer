import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersUrl = 'assets/data/orders.json';
  private selectedOrderSubject = new BehaviorSubject<Order | null>(null);
  selectedOrder$ = this.selectedOrderSubject.asObservable();

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  setSelectedOrder(order: Order): void {
    this.selectedOrderSubject.next(order);
  }
}
