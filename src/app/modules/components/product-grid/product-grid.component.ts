import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
})
export class ProductGridComponent implements OnInit {
  data: Product[];
  public searchInput: string;
  priceRange = ['All', 'Less than 500', '500 to 1000', '1000 and above'];
  selectedPrice = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.allProductsSubject.subscribe((res) => {
      this.data = res;
    });
  }

  priceChangeEventHandler(event) {
    this.selectedPrice = event.target.value;
    this.productService.filterByPrice(this.selectedPrice);
  }
  filterByCategory(category) {
    this.productService.filterByCategory(category);
  }
}
