import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onSale',
  standalone: true
})
export class OnSalePipe implements PipeTransform {

  transform(title: string): string {
    return 'onSale '+title;
  }

}
