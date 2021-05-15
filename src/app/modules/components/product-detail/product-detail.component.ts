import { NotificationService } from './../../../shared/services/notification.service';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  currentProduct: any;
  cartItems: any;
  quantityArray: number[] = [];
  productId: number;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params.id;
    let jdx = this.productService.allProducts.findIndex(
      (x) => x.Id === this.productId
    );
    this.currentProduct = this.productService.allProducts[jdx];

    for (let i = 1; i < 101; i++) {
      this.quantityArray.push(i);
    }
  }

  addToCart(currentProduct) {
    this.productService.addItemToCart(currentProduct);
  }

  onQuantityChange(value) {
    this.currentProduct.quantity = value;
  }
}
