import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { throwError } from 'rxjs';

import { environment } from '@environments/environment';

import { Payment } from '@models/payment.model';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const RESPONSE_ERROR_MOCK = { status: 400 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
    }).compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PaymentService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not immediately connect to the server', () => {
    httpMock.expectNone({});
  });

  describe('retrievePayments', () => {
    const RESPONSE_MOCK: HttpResponse<Payment[]> = {
      body: [
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
      ],
      headers: null,
      status: 201,
      statusText: '',
      ok: true,
      type: null,
      url: '',
      clone: jest.fn(),
    };

    it('should retrieve payments', () => {
      const url = `${environment.baseUrl}${environment.endpoints.payments}`;

      service
        .retrievePayments('name', 'desc', 1, 10, null)
        .subscribe((response: HttpResponse<Payment[]>) => {
          expect(response).toEqual(RESPONSE_MOCK);
        });

      const requestMock = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === url;
      });

      requestMock.flush(RESPONSE_MOCK);
    });

    it('should throw error when service return error', () => {
      let responseError;

      jest.spyOn(httpClient, 'get').mockReturnValue(throwError(RESPONSE_ERROR_MOCK));

      service.retrievePayments('name', 'desc', 1, 10, null).subscribe(
        () => {},
        (error) => {
          responseError = error;
        },
      );

      expect(responseError).toEqual(RESPONSE_ERROR_MOCK);
    });
  });

  describe('retrievePayment', () => {
    const RESPONSE_MOCK: Payment = {
      id: 1,
      name: 'Pennie Dumphries',
      username: 'pdumphries0',
      title: 'Dental Hygienist',
      value: 19.96,
      date: '2020-07-21T05:53:20Z',
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      isPayed: true,
    };

    const PAYMENT_ID = 1;

    it('should retrieve payment', () => {
      const url = `${environment.baseUrl}${environment.endpoints.payments}/${PAYMENT_ID}`;

      service.retrievePayment(PAYMENT_ID).subscribe((response: Payment) => {
        expect(response).toEqual(RESPONSE_MOCK);
      });

      const requestMock = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.urlWithParams === url;
      });

      requestMock.flush(RESPONSE_MOCK);
    });

    it('should throw error when service return error', () => {
      let responseError;

      jest.spyOn(httpClient, 'get').mockReturnValue(throwError(RESPONSE_ERROR_MOCK));

      service.retrievePayment(PAYMENT_ID).subscribe(
        () => {},
        (error) => {
          responseError = error;
        },
      );

      expect(responseError).toEqual(RESPONSE_ERROR_MOCK);
    });
  });

  describe('createPayment', () => {
    const REQUEST_MOCK: Omit<Payment, 'id'> = {
      name: 'Pennie Dumphries',
      username: 'pdumphries0',
      title: 'Dental Hygienist',
      value: 19.96,
      date: '2020-07-21T05:53:20Z',
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      isPayed: true,
    };

    const RESPONSE_MOCK: Payment = {
      id: 1,
      name: 'Pennie Dumphries',
      username: 'pdumphries0',
      title: 'Dental Hygienist',
      value: 19.96,
      date: '2020-07-21T05:53:20Z',
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      isPayed: true,
    };

    it('should create payment', () => {
      const url = `${environment.baseUrl}${environment.endpoints.payments}`;

      service.createPayment(REQUEST_MOCK).subscribe((response: Payment) => {
        expect(response).toEqual(RESPONSE_MOCK);
      });

      const requestMock = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === url;
      });

      requestMock.flush(RESPONSE_MOCK);
    });

    it('should throw error when service return error', () => {
      let responseError;

      jest.spyOn(httpClient, 'post').mockReturnValue(throwError(RESPONSE_ERROR_MOCK));

      service.createPayment(REQUEST_MOCK).subscribe(
        () => {},
        (error) => {
          responseError = error;
        },
      );

      expect(responseError).toEqual(RESPONSE_ERROR_MOCK);
    });
  });

  describe('deletePayment', () => {
    const RESPONSE_MOCK = {};

    const PAYMENT_ID = 1;

    it('should delete payment', () => {
      const url = `${environment.baseUrl}${environment.endpoints.payments}/${PAYMENT_ID}`;

      service.deletePayment(PAYMENT_ID).subscribe((response: {}) => {
        expect(response).toEqual(RESPONSE_MOCK);
      });

      const requestMock = httpMock.expectOne((req) => {
        return req.method === 'DELETE' && req.urlWithParams === url;
      });

      requestMock.flush(RESPONSE_MOCK);
    });

    it('should throw error when service return error', () => {
      let responseError;

      jest.spyOn(httpClient, 'delete').mockReturnValue(throwError(RESPONSE_ERROR_MOCK));

      service.deletePayment(PAYMENT_ID).subscribe(
        () => {},
        (error) => {
          responseError = error;
        },
      );

      expect(responseError).toEqual(RESPONSE_ERROR_MOCK);
    });
  });

  describe('updateAllPayment', () => {
    const REQUEST_MOCK: Omit<Payment, 'id'> = {
      name: 'Pennie Dumphries',
      username: 'pdumphries0',
      title: 'Dental Hygienist',
      value: 19.96,
      date: '2020-07-21T05:53:20Z',
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      isPayed: true,
    };

    const RESPONSE_MOCK: Payment = {
      id: 1,
      name: 'Pennie Dumphries',
      username: 'pdumphries0',
      title: 'Dental Hygienist',
      value: 19.96,
      date: '2020-07-21T05:53:20Z',
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      isPayed: true,
    };

    const PAYMENT_ID = 1;

    it('should update all payment', () => {
      const url = `${environment.baseUrl}${environment.endpoints.payments}/${PAYMENT_ID}`;

      service.updateAllPayment(PAYMENT_ID, REQUEST_MOCK).subscribe((response: Payment) => {
        expect(response).toEqual(RESPONSE_MOCK);
      });

      const requestMock = httpMock.expectOne((req) => {
        return req.method === 'PUT' && req.urlWithParams === url;
      });

      requestMock.flush(RESPONSE_MOCK);
    });

    it('should throw error when service return error', () => {
      let responseError;

      jest.spyOn(httpClient, 'put').mockReturnValue(throwError(RESPONSE_ERROR_MOCK));

      service.updateAllPayment(PAYMENT_ID, REQUEST_MOCK).subscribe(
        () => {},
        (error) => {
          responseError = error;
        },
      );

      expect(responseError).toEqual(RESPONSE_ERROR_MOCK);
    });
  });

  describe('updatePayment', () => {
    const REQUEST_MOCK: Omit<Partial<Payment>, 'id'> = {
      name: 'Pennie Dumphries',
      value: 19.96,
    };

    const RESPONSE_MOCK: Payment = {
      id: 1,
      name: 'Pennie Dumphries',
      username: 'pdumphries0',
      title: 'Dental Hygienist',
      value: 19.96,
      date: '2020-07-21T05:53:20Z',
      image: 'https://robohash.org/asperioresprovidentconsequuntur.png?size=150x150&set=set1',
      isPayed: true,
    };

    const PAYMENT_ID = 1;

    it('should update payment', () => {
      const url = `${environment.baseUrl}${environment.endpoints.payments}/${PAYMENT_ID}`;

      service.updatePayment(PAYMENT_ID, REQUEST_MOCK).subscribe((response: Payment) => {
        expect(response).toEqual(RESPONSE_MOCK);
      });

      const requestMock = httpMock.expectOne((req) => {
        return req.method === 'PATCH' && req.urlWithParams === url && req.body === REQUEST_MOCK;
      });

      requestMock.flush(RESPONSE_MOCK);
    });

    it('should throw error when service return error', () => {
      let responseError;

      jest.spyOn(httpClient, 'patch').mockReturnValue(throwError(RESPONSE_ERROR_MOCK));

      service.updatePayment(PAYMENT_ID, REQUEST_MOCK).subscribe(
        () => {},
        (error) => {
          responseError = error;
        },
      );

      expect(responseError).toEqual(RESPONSE_ERROR_MOCK);
    });
  });
});
