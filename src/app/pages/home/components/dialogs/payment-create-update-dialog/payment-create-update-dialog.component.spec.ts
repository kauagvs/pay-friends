import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@shared/shared.module';

import { PaymentService } from '@services/payment.service';

import { PaymentCreateUpdateDialogComponent } from './payment-create-update-dialog.component';

describe('PaymentCreateUpdateDialogComponent', () => {
  let component: PaymentCreateUpdateDialogComponent;
  let fixture: ComponentFixture<PaymentCreateUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentCreateUpdateDialogComponent],
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
    fixture = TestBed.createComponent(PaymentCreateUpdateDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create payment create update dialog component', () => {
    expect(component).toBeTruthy();
  });
});
