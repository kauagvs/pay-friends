import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularMaterialModule } from '@shared/angular-material.module';

import { ImageLoaderComponent } from './image-loader.component';

describe('ImageLoaderComponent', () => {
  let component: ImageLoaderComponent;
  let fixture: ComponentFixture<ImageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageLoaderComponent],
      imports: [CommonModule, AngularMaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
