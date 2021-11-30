import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { PaginatorComponent } from '@shared/components/paginator/paginator.component';

import { PaymentService } from '@services/payment.service';

import { Payment } from '@models/payment.model';

import { Utils } from '@utils/utils';

import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { PaymentDeleteDialogComponent } from './components/dialogs/payment-delete-dialog/payment-delete-dialog.component';
import { PaymentCreateUpdateDialogComponent } from './components/dialogs/payment-create-update-dialog/payment-create-update-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  dataSource: Payment[];

  displayedColumns: string[];

  isLoadingPayments: boolean;

  isLoadingPaymentCreate: boolean;

  isLoadingPaymentDelete: { [key: number]: boolean };

  isLoadingPaymentUpdateStatus: { [key: number]: boolean };

  isLoadingPaymentUpdate: { [key: number]: boolean };

  paymentsLength: number;

  private unsubscribeAll$: Subject<any>;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('paginator') paginator: PaginatorComponent;

  @ViewChild('searchFilter') searchFilter: SearchFilterComponent;

  constructor(
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
  ) {
    this.setDefaults();
  }

  ngAfterViewInit(): void {
    this.sortChange();
    this.retrievePayments();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  retrievePayments(): void {
    this.isLoadingPayments = true;

    this.paymentService
      .retrievePayments(
        this.sort.active,
        this.sort.direction,
        this.paginator.page,
        this.paginator.pageSize,
        this.searchFilter.filters,
      )
      .pipe(
        takeUntil(this.unsubscribeAll$),
        finalize(() => {
          this.isLoadingPayments = false;
        }),
      )
      .subscribe(
        (response: HttpResponse<Payment[]>) => {
          this.dataSource = response?.body;
          this.paymentsLength = +response.headers.get('X-Total-Count');
        },
        () => {
          this.toastrService.error('Erro ao buscar pagamentos');
        },
      );
  }

  createPayment(payment: Payment): void {
    this.isLoadingPaymentCreate = true;

    this.paymentService
      .createPayment(Utils.omit(payment, 'id'))
      .pipe(
        takeUntil(this.unsubscribeAll$),
        finalize(() => {
          this.isLoadingPaymentCreate = false;
        }),
      )
      .subscribe(
        () => {
          this.toastrService.success('Pagamento adicionado com sucesso.');
          this.retrievePayments();
        },
        () => {
          this.toastrService.error('Erro ao adicionar pagamento.');
        },
      );
  }

  updatePayment(paymentId: number, payment: Payment): void {
    this.isLoadingPaymentUpdate[paymentId] = true;

    const index = this.dataSource.findIndex((data) => data.id === paymentId);

    this.paymentService
      .updateAllPayment(paymentId, Utils.omit(payment, 'id'))
      .pipe(
        takeUntil(this.unsubscribeAll$),
        finalize(() => {
          this.isLoadingPaymentUpdate[paymentId] = false;
        }),
      )
      .subscribe(
        (paymentReponse: Payment) => {
          this.dataSource[index] = paymentReponse;
          this.toastrService.success('Pagamento atualizado com sucesso.');
        },
        () => {
          this.toastrService.error('Erro ao atualizar pagamento.');
        },
      );
  }

  updatePaymentStatus(id: number, isPaid: boolean): void {
    this.isLoadingPaymentUpdateStatus[id] = true;

    const index = this.dataSource.findIndex((data) => data.id === id);
    const payment = this.dataSource[index];

    this.paymentService
      .updatePayment(id, { isPayed: !isPaid })
      .pipe(
        takeUntil(this.unsubscribeAll$),
        finalize(() => {
          this.isLoadingPaymentUpdateStatus[id] = false;
        }),
      )
      .subscribe(
        () => {
          payment.isPayed = !isPaid;
          this.toastrService.success('Pagamento atualizado com sucesso.');
        },
        () => {
          payment.isPayed = isPaid;
          this.toastrService.error('Erro ao atualizar pagamento.');
        },
      );
  }

  deletePayment(id: number): void {
    this.isLoadingPaymentDelete[id] = true;

    this.paymentService
      .deletePayment(id)
      .pipe(
        takeUntil(this.unsubscribeAll$),
        finalize(() => {
          this.isLoadingPaymentDelete[id] = false;
        }),
      )
      .subscribe(
        () => {
          this.toastrService.success('Pagamento excluído com sucesso.');
          this.retrievePayments();
        },
        () => {
          this.toastrService.error('Erro ao excluir pagamento.');
        },
      );
  }

  openPaymentCreateUpdateDialog(payment?: Payment): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      data: payment,
      actions: {
        no: 'CANCELAR',
      },
    };

    this.dialog
      .open(PaymentCreateUpdateDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((paymentData?: Payment) => {
        if (paymentData) {
          if (payment) {
            this.updatePayment(payment.id, paymentData);
          } else {
            this.createPayment(paymentData);
          }
        }
      });
  }

  openPaymentDeleteDialog(paymentId: number, payment: Payment): void {
    const dialogConfig = new MatDialogConfig();

    const user = `Usuário: ${payment.name}`;
    const date = `Data: ${this.datePipe.transform(payment.date, 'dd/MM/yyyy')}`;
    const value = `Valor: ${this.currencyPipe.transform(payment.value)}`;

    dialogConfig.data = {
      message: 'Certeza que deseja excluir pagamento?',
      data: `${user}</br>${date}</br>${value}`,
      actions: {
        no: 'CANCELAR',
        yes: `EXCLUIR`,
      },
    };

    this.dialog
      .open(PaymentDeleteDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((response) => {
        if (response) {
          this.deletePayment(paymentId);
        }
      });
  }

  private sortChange(): void {
    this.sort.sortChange.subscribe(() => {
      this.paginator.page = 1;
      this.retrievePayments();
    });
  }

  private setDefaults(): void {
    this.displayedColumns = ['image', 'name', 'title', 'date', 'value', 'isPayed', 'actions'];
    this.isLoadingPayments = false;
    this.isLoadingPaymentCreate = false;
    this.isLoadingPaymentDelete = {};
    this.isLoadingPaymentUpdate = {};
    this.isLoadingPaymentUpdateStatus = {};

    this.unsubscribeAll$ = new Subject();
  }
}
