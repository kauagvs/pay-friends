import { AfterViewInit, Component, ElementRef, Inject, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { fromEvent, merge, Observable } from 'rxjs';

import { format } from 'date-fns';

import { DisplayMessage, GenericFormValidator } from '@utils/generic-form-validator';

import { Payment } from '@models/payment.model';

interface DialogActions {
  no: string;
  yes: string;
}

interface DialogData {
  message?: string;
  data: Payment;
  actions?: DialogActions;
}

@Component({
  selector: 'app-payment-create-update-dialog',
  templateUrl: './payment-create-update-dialog.component.html',
  styleUrls: ['./payment-create-update-dialog.component.scss'],
})
export class PaymentCreateUpdateDialogComponent implements AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  paymentData: Payment;

  paymentForm: FormGroup;

  message: string;

  actions: DialogActions;

  displayMessage: DisplayMessage;

  private genericFormValidator: GenericFormValidator;

  private isEditionMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PaymentCreateUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.paymentData = this.data.data;
    this.setDefaults();
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur'),
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericFormValidator.processMessages(this.paymentForm);
    });
  }

  confirm(): void {
    if (this.paymentForm.valid) {
      const payment = {} as Payment;

      for (const controlName of Object.keys(this.paymentForm.controls)) {
        const controlValue = this.paymentForm.controls[controlName].value;

        if (controlName === 'user') {
          payment.name = controlValue;
        } else if (controlName === 'isPaid') {
          payment.isPayed = controlValue;
        } else if (controlName === 'date') {
          payment.date = format(new Date(controlValue), 'yyyy-MM-dd');
        } else {
          payment[controlName] = controlValue;
        }
      }

      this.dialogRef.close(payment);
    }
  }

  private createPaymentForm(): FormGroup {
    return this.formBuilder.group({
      user: [this.paymentData?.name ?? '', Validators.required],
      value: [this.paymentData?.value ?? '', Validators.required],
      date: [{ value: this.paymentData?.date ?? '', disabled: true }, Validators.required],
      title: [this.paymentData?.title ?? ''],
      isPaid: [Boolean(this.paymentData?.isPayed) ?? false],
    });
  }

  private setDefaults(): void {
    this.paymentForm = this.createPaymentForm();
    this.isEditionMode = !!this.paymentData;
    this.message = `${this.isEditionMode ? 'Editar' : 'Adicionar'} pagamento`;
    this.actions = {
      no: 'CANCELAR',
      yes: this.isEditionMode ? 'EDITAR' : 'ADICIONAR',
    };

    this.displayMessage = {};

    this.genericFormValidator = new GenericFormValidator({
      user: {
        required: 'Campo obrigatório',
      },
      value: {
        required: 'Campo obrigatório',
      },
      date: {
        required: 'Campo obrigatório',
      },
    });
  }
}
