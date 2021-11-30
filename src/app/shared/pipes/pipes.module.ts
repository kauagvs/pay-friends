import { NgModule } from '@angular/core';

import { EmptyPipe } from './empty/empty.pipe';

@NgModule({
  declarations: [EmptyPipe],
  exports: [EmptyPipe],
})
export class PipesModule {}
