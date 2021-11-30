import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { SortDirection } from '@angular/material/sort';

import { Observable } from 'rxjs';

import { format } from 'date-fns';

import { Utils } from '@core/utils/utils';

import { environment } from '@environments/environment';

import { SearchFilter } from '@pages/home/components/search-filter/search-filter.component';

import { Payment } from '@models/payment.model';

@Injectable()
export class PaymentService {
  private url: string;

  constructor(private readonly http: HttpClient) {
    this.url = `${environment.baseUrl}${environment.endpoints.payments}`;
  }

  retrievePayments(
    sortActive: string,
    sortDirection: SortDirection,
    page: number,
    pageSize: number,
    filters: SearchFilter,
  ): Observable<HttpResponse<Payment[]>> {
    let params = new HttpParams();
    params = params.append('_sort', sortActive);
    params = params.append('_order', sortDirection);
    params = params.append('_page', page);
    params = params.append('_limit', pageSize);

    Object.keys(filters ?? {}).forEach((filterName: string) => {
      let name = filterName;
      let value = filters[filterName];

      if (value !== undefined && value !== null && value !== '') {
        if (name === 'date') {
          name = 'q';
          value = format(new Date(value), 'yyyy-MM-dd');
        }

        if (name === 'isPaid') {
          name = 'isPayed';
          value = Boolean(value);
        }

        params = params.append(name, value);
      }
    });

    return this.http.get<Payment[]>(this.url, {
      params,
      observe: 'response',
    });
  }

  retrievePayment(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.url}/${paymentId}`);
  }

  createPayment(payment: Omit<Payment, 'id'>): Observable<Payment> {
    return this.http.post<Payment>(this.url, Utils.generatePaymentData(payment));
  }

  deletePayment(paymentId: number): Observable<{}> {
    return this.http.delete<{}>(`${this.url}/${paymentId}`);
  }

  updateAllPayment(paymentId: number, payment: Omit<Payment, 'id'>): Observable<Payment> {
    return this.http.put<Payment>(`${this.url}/${paymentId}`, Utils.generatePaymentData(payment));
  }

  updatePayment(paymentId: number, payment: Omit<Partial<Payment>, 'id'>): Observable<Payment> {
    return this.http.patch<Payment>(`${this.url}/${paymentId}`, payment);
  }
}
