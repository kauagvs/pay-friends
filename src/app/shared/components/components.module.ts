import { NgModule } from '@angular/core';

import { ImageLoaderModule } from './image-loader/image-loader.module';
import { LoaderModule } from './loader/loader.module';
import { PaginatorModule } from './paginator/paginator.module';

@NgModule({
  imports: [ImageLoaderModule, LoaderModule, PaginatorModule],
  exports: [ImageLoaderModule, LoaderModule, PaginatorModule],
})
export class ComponentsModule {}
