import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

import { PaymentService } from '@services/payment.service';

import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFilterComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([]),
      ],
      providers: [PaymentService, DatePipe, CurrencyPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create search filter component', () => {
    expect(component).toBeTruthy();
  });
});
