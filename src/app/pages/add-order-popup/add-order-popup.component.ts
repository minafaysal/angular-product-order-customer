import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../shared/services/order.service';
import { takeUntil } from 'rxjs';
import { ComponentBase } from '../../shared/base/common.base';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../shared/models/product.model';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
  selector: 'app-add-order-popup',
  templateUrl: './add-order-popup.component.html',
  styleUrls: ['./add-order-popup.component.scss'],
})
export class AddOrderPopupComponent extends ComponentBase implements OnInit {
  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrderPopupComponent>,
    private readonly orderService: OrdersService,
    private readonly customerService: CustomerService,
    private readonly toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: Product[]
  ) {
    super();
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required],
      Address: ['', Validators.required],
      PaymentType: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.loading = true;
      const id = this.generateRandomCustomerId();
      const registerDate = this.generateRegisterDate();
      const orderId = this.generateRandomOrderId();

      this.customerService
        .addCustomer({
          Id: id,
          Name: this.orderForm.value.Name,
          Email: this.orderForm.value.Email,
          Phone: this.orderForm.value.Phone,
          Address: this.orderForm.value.Address,
          RegisterDate: registerDate,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {});

      this.orderService
        .addOrder({
          OrderId: orderId,
          OrderDate: registerDate,
          UserId: id,
          Products: [...this.data],
          PaymentType: this.orderForm.value.PaymentType,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.loading = false;
          this.toastr.success(' Order Added Successfull !');
        });
      this.orderForm.reset();
      this.dialogRef.close();
    }
  }

  // Function to generate generate Random Customer Id
  generateRandomCustomerId(): string {
    const random = Math.floor(Math.random() * 1000).toString();
    return random + '-' + random + '-' + random;
  }

  // Function to generate RegisterDate
  generateRegisterDate(): string {
    return new Date().toString();
  }
  // Function to generate generate Random Order Id
  generateRandomOrderId(): number {
    const minId = 1000;
    const maxId = 9999;
    return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  }
}
