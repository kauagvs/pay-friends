import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { throwError } from 'rxjs';

import { Account } from '@models/account.model';

import { AccountService } from './account.service';
import { AuthenticationService } from './authentication.service';

describe('AccountService', () => {
  let service: AuthenticationService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const ACCOUNT_MOCK = {
    email: 'usuario@gmail.com',
    password: 'usuario',
  };

  const RESPONSE_MOCK = {
    id: '0',
    name: 'usuario',
    ...ACCOUNT_MOCK,
  };

  const RESPONSE_ERROR_MOCK = { status: 400 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService, AuthenticationService],
    }).compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthenticationService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login user', () => {
    const { email, password } = ACCOUNT_MOCK;

    service.login(email, password).subscribe((response: Account) => {
      expect(response).toEqual(RESPONSE_MOCK);
    });

    const requestMock = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    requestMock.flush(RESPONSE_MOCK);
  });

  it('should logout user', () => {
    localStorage.setItem('currentUser', JSON.stringify(ACCOUNT_MOCK));

    service.logout();

    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(service.currentUserValue).toBeNull();
  });

  it('should throw error when service return error', () => {
    const { email, password } = ACCOUNT_MOCK;
    let responseError;

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(RESPONSE_ERROR_MOCK));

    service.login(email, password).subscribe(
      () => {},
      (error) => {
        responseError = error;
      },
    );

    expect(responseError).toEqual(RESPONSE_ERROR_MOCK);
  });
});
