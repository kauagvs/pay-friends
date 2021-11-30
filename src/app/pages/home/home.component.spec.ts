import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SortDirection } from '@angular/material/sort';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { SharedModule } from '@shared/shared.module';

import { Utils } from '@utils/utils';

import { PaymentService } from '@services/payment.service';

import { Payment } from '@models/payment.model';

import { HomeComponent } from './home.component';
import { PaymentCreateUpdateDialogComponent } from './components/dialogs/payment-create-update-dialog/payment-create-update-dialog.component';
import { PaymentDeleteDialogComponent } from './components/dialogs/payment-delete-dialog/payment-delete-dialog.component';
import {
  SearchFilter,
  SearchFilterComponent,
} from './components/search-filter/search-filter.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let paymentService: PaymentService;

  const PAYMENTS_MOCK: Payment[] = [
    {
      id: 1,
      name: 'Pennie Dumphries',
      username: 'pdumphries0',
      title: 'Dental Hygienist',
      value: 19.96,
      date: '2020-07-21T05:53:20Z',
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      isPayed: true,
    },
    {
      id: 2,
      name: 'Foster Orthmann',
      username: 'forthmann1',
      title: 'Professor',
      value: 207.36,
      date: '2021-01-28T14:01:29Z',
      image: 'https://robohash.org/quasetqui.png?size=150x150&set=set1',
      isPayed: true,
    },
    {
      id: 3,
      name: 'Crissie Summerill',
      username: 'csummerill2',
      title: 'VP Product Management',
      value: 464.54,
      date: '2020-02-09T18:20:32Z',
      image: 'https://robohash.org/natusinciduntsapiente.png?size=150x150&set=set1',
      isPayed: false,
    },
  ];

  const PAYMENTS_RESPONSE_MOCK = new HttpResponse({
    body: PAYMENTS_MOCK,
    headers: null,
    status: 201,
    statusText: '',
  });

  class PaymentServiceMock {
    retrievePayments(
      sortActive: string,
      sortDirection: SortDirection,
      page: number,
      pageSize: number,
      filters?: SearchFilter,
    ): Observable<HttpResponse<Payment[]>> {
      if (sortActive && sortDirection && page && pageSize && filters) {
        return of(PAYMENTS_RESPONSE_MOCK);
      }

      return of(null);
    }

    createPayment(payment: Omit<Payment, 'id'>): Observable<Payment> {
      const response: Payment = { id: PAYMENTS_MOCK[0].id, ...payment };
      return of(response);
    }

    updateAllPayment(paymentId: number, payment: Omit<Payment, 'id'>): Observable<Payment> {
      const response: Payment = { id: paymentId, ...payment };
      return of(response);
    }

    updatePayment(paymentId: number, payment: Omit<Partial<Payment>, 'id'>): Observable<Payment> {
      const response: Payment = { ...payment, ...PAYMENTS_MOCK[0], id: paymentId };
      return of(response);
    }

    deletePayment(paymentId: number): Observable<{}> {
      if (paymentId) {
        return of({});
      }

      return of({});
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        SearchFilterComponent,
        PaymentDeleteDialogComponent,
        PaymentCreateUpdateDialogComponent,
      ],
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
        { provide: PaymentService, useClass: PaymentServiceMock },
        DatePipe,
        CurrencyPipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    paymentService = TestBed.inject(PaymentService);

    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve payments', () => {
    const retrievePayments = jest.spyOn(component, 'retrievePayments');
    const retrievePaymentsService = jest.spyOn(paymentService, 'retrievePayments');

    const { sort, paginator, searchFilter } = component;

    component.ngAfterViewInit();

    expect(retrievePayments).toHaveBeenCalled();
    expect(retrievePaymentsService).toHaveBeenCalledWith(
      sort.active,
      sort.direction,
      paginator.page,
      paginator.pageSize,
      searchFilter.filters,
    );

    retrievePaymentsService.mock.results[0].value?.subscribe(
      (response: HttpResponse<Payment[]>) => {
        expect(component.dataSource).toEqual(response?.body);
        expect(component.dataSource).toHaveLength(response?.body?.length);
      },
    );
  });

  it('should create payment', () => {
    const createPaymentService = jest.spyOn(paymentService, 'createPayment');

    const [payment] = PAYMENTS_MOCK;
    const paymentData = Utils.omit({ ...payment }, 'id');

    component.createPayment(paymentData);

    expect(createPaymentService).toHaveBeenCalledWith(paymentData);

    createPaymentService.mock.results[0].value.subscribe((response: Payment) => {
      expect(response).toEqual(payment);
    });
  });

  it('should update payment', () => {
    const updatePaymentService = jest.spyOn(paymentService, 'updateAllPayment');

    const [payment] = PAYMENTS_MOCK;
    const paymentData = Utils.omit({ ...payment }, 'id');

    component.ngAfterViewInit();
    component.updatePayment(payment.id, paymentData);

    updatePaymentService.mock.results[0].value.subscribe((response: Payment) => {
      expect(response).toEqual(payment);
    });
  });

  it('should update payment status', () => {
    const updatePaymentService = jest.spyOn(paymentService, 'updatePayment');

    const [payment] = PAYMENTS_MOCK;

    component.ngAfterViewInit();
    component.updatePaymentStatus(payment.id, payment.isPayed);

    updatePaymentService.mock.results[0].value.subscribe((response: Payment) => {
      expect(response).toEqual(payment);
    });
  });

  it('should delete payment', () => {
    const deletePaymentService = jest.spyOn(paymentService, 'deletePayment');

    const [payment] = PAYMENTS_MOCK;

    component.ngAfterViewInit();
    component.deletePayment(payment.id);

    deletePaymentService.mock.results[0].value.subscribe((response: any) => {
      expect(response).toEqual({});
    });
  });
});
