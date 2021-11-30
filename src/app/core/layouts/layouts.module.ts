import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TemplatesModule } from '@templates/templates.module';

import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, RouterModule, TemplatesModule],
  exports: [MainComponent],
})
export class LayoutsModule {}
