import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { SharedModule } from '@shared/shared.module';

import { AccountService } from '@services/account.service';
import { AuthenticationService } from '@services/authentication.service';

import { GenericFormValidator, ValidationMessages } from '@utils/generic-form-validator';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  describe('isolated test', () => {
    let component: LoginComponent;
    let authenticationService: AuthenticationService;
    let route: ActivatedRoute;
    let router: Router;
    let formBuilder: FormBuilder;
    let toastrService: ToastrService;

    const VALIDATION_MESSAGES_MOCK: ValidationMessages = {
      email: {
        required: 'Campo obrigatório',
        serverError: 'Usuário ou senha inválidos',
      },
      password: {
        required: 'Campo obrigatório',
      },
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          SharedModule,
          HttpClientModule,
          RouterModule.forRoot([]),
        ],
        providers: [
          AccountService,
          AuthenticationService,
          { provide: APP_BASE_HREF, useValue: '/' },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      authenticationService = TestBed.inject(AuthenticationService);
      route = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
      formBuilder = TestBed.inject(FormBuilder);
      toastrService = TestBed.inject(ToastrService);

      component = new LoginComponent(
        authenticationService,
        route,
        router,
        formBuilder,
        toastrService,
      );
    });

    it('should set default configurations', () => {
      const genericFormValidator = new GenericFormValidator(VALIDATION_MESSAGES_MOCK);

      expect(component.loginForm).toBeInstanceOf(FormGroup);
      expect(component.loading).toBeFalsy();
      expect(component.returnUrl).toBe('/');
      expect(component.showPassword).toBeFalsy();
      expect(component.displayMessage).toEqual({});
      expect(component['genericFormValidator']).toBeInstanceOf(GenericFormValidator);
      expect(component['genericFormValidator']).toEqual(genericFormValidator);
      expect(component['unsubscribeAll$']).toBeInstanceOf(Subject);
    });
  });

  describe('behavior test', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    const ACCOUNT_MOCK = {
      email: 'usuario@gmail.com',
      password: 'usuario',
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          CommonModule,
          NoopAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          SharedModule,
          HttpClientModule,
          RouterModule.forRoot([]),
        ],
        providers: [
          AccountService,
          AuthenticationService,
          { provide: APP_BASE_HREF, useValue: '/' },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should create login component', () => {
      expect(component).toBeTruthy();
    });

    it('should render input elements', () => {
      const compiled = fixture.debugElement.nativeElement;
      const emailInput = compiled.querySelector('input[data-test=login-form-email-input]');
      const passwordInput = compiled.querySelector('input[data-test=login-form-password-input]');

      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
    });

    it('should test form validity', () => {
      const { loginForm } = component;
      expect(loginForm.valid).toBeFalsy();

      const { email, password } = ACCOUNT_MOCK;

      loginForm.get('email')?.setValue(email);
      loginForm.get('password')?.setValue(password);

      expect(loginForm.valid).toBeTruthy();
    });

    it('should test input validity', () => {
      const emailInput = component.loginForm.controls.email;
      const passwordInput = component.loginForm.controls.password;

      expect(emailInput.valid).toBeFalsy();
      expect(passwordInput.valid).toBeFalsy();

      const { email, password } = ACCOUNT_MOCK;

      emailInput.setValue(email);
      expect(emailInput.valid).toBeTruthy();

      passwordInput.setValue(password);
      expect(passwordInput.valid).toBeTruthy();
    });

    it('should test input errors', () => {
      const emailInput = component.loginForm.controls.email;
      const passwordInput = component.loginForm.controls.password;

      expect(emailInput.errors.required).toBeTruthy();
      expect(passwordInput.errors.required).toBeTruthy();

      const { email, password } = ACCOUNT_MOCK;

      emailInput.setValue(email);
      expect(emailInput.errors).toBeNull();

      passwordInput.setValue(password);
      expect(passwordInput.errors).toBeNull();
    });

    it('should the button be disabled  when some input has error', () => {
      const compiled = fixture.debugElement.nativeElement;
      const loginButton = compiled.querySelector('button[data-test=login-button]');

      expect(loginButton.disabled).toBeTruthy();
    });

    it('should the button not be disabled when all inputs are valid', () => {
      const { email, password } = ACCOUNT_MOCK;
      component.loginForm.get('email')?.setValue(email);
      component.loginForm.get('password')?.setValue(password);

      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      const loginButton = compiled.querySelector('button[data-test=login-button]');

      expect(loginButton.disabled).toBeFalsy();
    });

    it('should the login method not be called when login button is disabled', () => {
      const loginMethod = jest.spyOn(component, 'login').mockReturnValue(null);

      const compiled = fixture.debugElement.nativeElement;
      const loginButton = compiled.querySelector('button[data-test=login-button]');

      loginButton.click();

      expect(loginMethod).not.toHaveBeenCalled();
    });

    it('should the login method be called when login button is not disabled', () => {
      const loginMethod = jest.spyOn(component, 'login').mockReturnValue(null);

      const compiled = fixture.debugElement.nativeElement;
      const loginButton = compiled.querySelector('button[data-test=login-button]');

      const { email, password } = ACCOUNT_MOCK;
      component.loginForm.get('email')?.setValue(email);
      component.loginForm.get('password')?.setValue(password);

      fixture.detectChanges();

      loginButton.click();

      expect(loginMethod).toHaveBeenCalled();
    });
  });
});
