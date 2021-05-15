import { ProductService } from './../../shared/services/product.service';
// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({name:'appFilter'})
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */

  constructor(private productService: ProductService) {}
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    } else {
      searchText = searchText.toLocaleLowerCase();

      return items.filter((it) => {
        return it.name.toLocaleLowerCase().includes(searchText);
      });
    }
  }
}
