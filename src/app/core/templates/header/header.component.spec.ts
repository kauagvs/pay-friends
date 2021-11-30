import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '@shared/shared.module';

import { AccountService } from '@services/account.service';
import { AuthenticationService } from '@services/authentication.service';

import { Account } from '@models/account.model';

import { BehaviorSubject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let authenticationService: AuthenticationService;

  class AuthenticationServiceMock {
    private account: Account = {
      id: 1,
      name: 'usuario',
      email: 'usuario@gmail.com',
      password: 'usuario',
    };

    private currentUserSubject: BehaviorSubject<Account>;

    constructor() {
      this.currentUserSubject = new BehaviorSubject<Account>(this.account);
      this.currentUserSubject.asObservable();
    }

    get currentUserValue(): Account {
      return this.currentUserSubject.value;
    }

    logout(): void {
      this.currentUserSubject.next(null);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
        SharedModule,
      ],
      providers: [
        AccountService,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    authenticationService = TestBed.inject(AuthenticationService);

    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logo image', () => {
    const compiled = fixture.debugElement.nativeElement;
    const img = compiled.querySelector('img');

    expect(img).toBeTruthy();
    expect(img.alt).toBe('Logo image');
  });

  it('should have user name', () => {
    const currentUserValue = jest.spyOn(authenticationService, 'currentUserValue', 'get');

    const compiled = fixture.debugElement.nativeElement;
    const userName = compiled.querySelector('[data-test=user-name]');

    component.ngOnInit();

    expect(userName).toBeTruthy();
    expect(currentUserValue).toHaveBeenCalled();
    expect(userName.textContent).toContain(currentUserValue.mock.results[0].value.name);
  });

  it('should have profile image', () => {
    const compiled = fixture.debugElement.nativeElement;
    const profileImage = compiled.querySelector('[data-test=profile-image]');

    expect(profileImage).toBeTruthy();
    expect(profileImage.alt).toBe('User photo');
  });

  it('should logout user', () => {
    const logout = jest.spyOn(component, 'logout');
    const routerNavigate = jest.spyOn(router, 'navigate').mockReturnValue(null);
    const currentUserValue = jest
      .spyOn(authenticationService, 'currentUserValue', 'get')
      .mockReturnValue(null);

    component.logout();

    expect(logout).toHaveBeenCalled();
    expect(currentUserValue.mock.results).toHaveLength(0);
    expect(routerNavigate).toBeTruthy();
  });
});
