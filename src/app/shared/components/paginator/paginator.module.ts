import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from '../../angular-material.module';

import { PaginatorComponent } from './paginator.component';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, FormsModule, FlexLayoutModule, AngularMaterialModule],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
