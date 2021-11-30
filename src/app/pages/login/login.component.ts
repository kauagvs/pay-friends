import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { DisplayMessage, GenericFormValidator } from '@utils/generic-form-validator';

import { AuthenticationService } from '@services/authentication.service';

import { Account } from '@models/account.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  loginForm: FormGroup;

  loading: boolean;

  returnUrl: string;

  showPassword: boolean;

  displayMessage: DisplayMessage;

  private genericFormValidator: GenericFormValidator;

  private unsubscribeAll$: Subject<any>;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.setDefaults();
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur'),
    );

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericFormValidator.processMessages(this.loginForm);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.controls;

      this.loading = true;

      this.authenticationService
        .login(email.value, password.value)
        .pipe(
          takeUntil(this.unsubscribeAll$),
          finalize(() => {
            this.loading = false;
          }),
        )
        .subscribe(
          (account: Account) => {
            if (account) {
              this.loginForm.reset();
              this.loginForm.clearValidators();
              this.router.navigate([this.returnUrl], {
                state: {
                  from: 'login',
                },
              });
            } else {
              this.loginForm.get('email')?.setErrors({
                serverError: true,
              });

              this.displayMessage = this.genericFormValidator.processMessages(this.loginForm);
            }
          },
          () => {
            this.toastrService.error('Tente novamente.', 'Erro ao tentar fazer login.');
          },
        );
    }
  }

  private createLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private setDefaults(): void {
    this.loginForm = this.createLoginForm();
    this.loading = false;
    this.returnUrl = this.route.snapshot.queryParams.returnUrl ?? '/';
    this.showPassword = false;
    this.displayMessage = {};

    this.genericFormValidator = new GenericFormValidator({
      email: {
        required: 'Campo obrigatório',
        serverError: 'Usuário ou senha inválidos',
      },
      password: {
        required: 'Campo obrigatório',
      },
    });
    this.unsubscribeAll$ = new Subject();
  }
}
