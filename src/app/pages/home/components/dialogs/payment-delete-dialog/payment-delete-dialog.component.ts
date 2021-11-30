import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  message: string;
  data: string;
  actions: {
    no: string;
    yes: string;
  };
}

@Component({
  selector: 'app-payment-delete-dialog',
  templateUrl: './payment-delete-dialog.component.html',
  styleUrls: ['./payment-delete-dialog.component.scss'],
})
export class PaymentDeleteDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<PaymentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }
}
