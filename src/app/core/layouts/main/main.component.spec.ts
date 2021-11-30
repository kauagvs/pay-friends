import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockModule } from 'ng-mocks';

import { AccountService } from '@services/account.service';
import { AuthenticationService } from '@services/authentication.service';

import { TemplatesModule } from '@templates/templates.module';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule, MockModule(TemplatesModule)],
      providers: [AccountService, AuthenticationService, { provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
  });

  it('should be create main component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have tag main', () => {
    const compiled = fixture.debugElement.nativeElement;
    const mainTag = compiled.querySelector('main');

    expect(mainTag).toBeTruthy();
  });

  it('should have a router-outlet', () => {
    const compiled = fixture.debugElement.nativeElement;
    const routerOutletTag = compiled.querySelector('router-outlet');

    expect(routerOutletTag).toBeTruthy();
  });
});
