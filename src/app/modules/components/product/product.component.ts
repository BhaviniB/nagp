import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private router: Router,
    private productService: ProductService,
    public translate: TranslateService
  ) {}

  @Input() product: any;

  ngOnInit(): void {}

  displayDetails(Id) {
    this.router.navigate(['/product-detail', Id]);
  }
}
