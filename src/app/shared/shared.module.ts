import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found/not-found.component';
import { AddOrderPopupComponent } from './components/add-order/add-order-popup/add-order-popup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotFoundComponent, AddOrderPopupComponent],
  imports: [CommonModule, FormsModule],
})
export class SharedModule {}
