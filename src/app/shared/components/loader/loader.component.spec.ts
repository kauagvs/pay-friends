import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterEvent } from '@angular/router';

import { LoaderService } from '@services/loader.service';
import { of } from 'rxjs';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  const ROUTER_MOCK = { events: of(new RouterEvent(null, null)), getCurrentNavigation: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [LoaderService, { provide: Router, useValue: ROUTER_MOCK }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
