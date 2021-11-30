import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '@models/account.model';

import { AccountService } from '@services/account.service';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Account>;

  constructor(private accountService: AccountService) {
    this.currentUserSubject = new BehaviorSubject<Account>(
      JSON.parse(localStorage.getItem('currentUser')),
    );
    this.currentUserSubject.asObservable();
  }

  get currentUserValue(): Account {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.accountService.retrieveAccount(email, password).pipe(
      map((account: Account) => {
        if (account) {
          localStorage.setItem('currentUser', JSON.stringify(account));
          this.currentUserSubject.next(account);
        }

        return account;
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
