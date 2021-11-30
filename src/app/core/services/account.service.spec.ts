import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { throwError } from 'rxjs';

import { environment } from '@environments/environment';

import { Account } from '@models/account.model';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
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
      providers: [AccountService],
    }).compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve user account', () => {
    const { email, password } = ACCOUNT_MOCK;
    const queryParams = `?email=${email}&password=${password}`;
    const url = `${environment.baseUrl}${environment.endpoints.account}${queryParams}`;

    service.retrieveAccount(email, password).subscribe((response: Account) => {
      expect(response).toEqual(RESPONSE_MOCK);
    });

    const requestMock = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.urlWithParams === url;
    });

    requestMock.flush(RESPONSE_MOCK);
  });

  it('should throw error when service return error', () => {
    const { email, password } = ACCOUNT_MOCK;
    let responseError;

    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(RESPONSE_ERROR_MOCK));

    service.retrieveAccount(email, password).subscribe(
      () => {},
      (error) => {
        responseError = error;
      },
    );

    expect(responseError).toEqual(RESPONSE_ERROR_MOCK);
  });
});
