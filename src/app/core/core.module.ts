import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountService } from '@services/account.service';
import { AuthenticationService } from '@services/authentication.service';
import { PaymentService } from '@services/payment.service';

import { AuthGuard } from '@guards/auth.guard';

import { LayoutsModule } from '@layouts/layouts.module';

import { LoaderService } from '@services/loader.service';

@NgModule({
  imports: [RouterModule, LayoutsModule],
  exports: [LayoutsModule],
  providers: [AccountService, AuthenticationService, PaymentService, AuthGuard, LoaderService],
})
export class CoreModule {}
