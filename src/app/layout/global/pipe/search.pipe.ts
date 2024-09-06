import { oProduct, product } from '../../../project/interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: oProduct[],word:string): oProduct[] {
    if (word) {
      const data= products.filter((product)=>{
        return product.title.toLowerCase().includes(word.toLowerCase());
      }
    );
      return data;
    }else{
      return products;
    }
    }

}
