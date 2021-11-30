import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { Account } from '@models/account.model';

@Injectable()
export class AccountService {
  private url: string;

  constructor(private readonly http: HttpClient) {
    this.url = `${environment.baseUrl}${environment.endpoints.account}`;
  }

  retrieveAccount(email: string, password: string): Observable<Account> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);

    return this.http
      .get<Account[]>(this.url, { params })
      .pipe(map((accounts: Account[]) => accounts?.[0]));
  }
}
