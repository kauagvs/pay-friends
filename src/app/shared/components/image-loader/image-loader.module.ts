import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '@shared/angular-material.module';

import { ImageLoaderComponent } from './image-loader.component';

@NgModule({
  declarations: [ImageLoaderComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [ImageLoaderComponent],
})
export class ImageLoaderModule {}
