import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { PaymentService } from '@services/payment.service';

import { HomeComponent } from './home.component';

import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { PaymentDeleteDialogComponent } from './components/dialogs/payment-delete-dialog/payment-delete-dialog.component';
import { PaymentCreateUpdateDialogComponent } from './components/dialogs/payment-create-update-dialog/payment-create-update-dialog.component';

import { HomeRoutingModule } from './home-routing.module';

const COMPONENTS = [
  SearchFilterComponent,
  PaymentDeleteDialogComponent,
  PaymentCreateUpdateDialogComponent,
];

@NgModule({
  declarations: [HomeComponent, ...COMPONENTS],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, HomeRoutingModule],
  exports: [HomeComponent],
  providers: [PaymentService, DatePipe, CurrencyPipe],
})
export class HomeModule {}
