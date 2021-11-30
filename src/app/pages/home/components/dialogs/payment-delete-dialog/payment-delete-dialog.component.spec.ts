import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@shared/shared.module';

import { PaymentService } from '@services/payment.service';

import { PaymentDeleteDialogComponent } from './payment-delete-dialog.component';

describe('PaymentDeleteDialogComponent', () => {
  let component: PaymentDeleteDialogComponent;
  let fixture: ComponentFixture<PaymentDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentDeleteDialogComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([]),
      ],
      providers: [
        PaymentService,
        DatePipe,
        CurrencyPipe,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDeleteDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create payment delete dialog component', () => {
    expect(component).toBeTruthy();
  });
});
