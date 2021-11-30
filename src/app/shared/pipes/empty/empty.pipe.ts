import { Pipe, PipeTransform } from '@angular/core';

import { Utils } from '@utils/utils';

@Pipe({
  name: 'empty',
})
export class EmptyPipe implements PipeTransform {
  transform(value: any): any {
    return Utils.isEmpty(value) ? '—' : value;
  }
}
