import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../shared/services/order.service';
import { takeUntil } from 'rxjs';
import { ComponentBase } from '../../shared/base/common.base';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../shared/models/product.model';

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
    private readonly toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: Product
  ) {
    super();
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required],
      Address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.loading = true;
      console.log(this.orderForm.value);
      this.orderForm.reset();
      this.dialogRef.close();
    }
  }
}
