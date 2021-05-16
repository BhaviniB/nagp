import { NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[];
  quantityArray: number[] = [];
  selected: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationService.showSuccess("Here's your cart!", '');
    for (let i = 1; i < 101; i++) {
      this.quantityArray.push(i);
    }

    this.productService.currentCartSubject.subscribe((res) => {
      if (res) {
        this.cartItems = res;
      }
    });

    if (localStorage.cart != null && localStorage.cart != undefined) {
      this.cartItems = JSON.parse(localStorage.cart);
    } else {
      this.cartItems = [];
    }
  }

  getTotal() {
    var total = 0;
    if (
      this.cartItems != null &&
      this.cartItems != [] &&
      this.cartItems != undefined
    ) {
      for (var i = 0; i < this.cartItems.length; i++) {
        var product = this.cartItems[i];
        if (product) {
          total += product.price * product.quantity;
        }
      }
      return total;
    } else {
      return 0;
    }
  }

  onQuantityChange(event, Id) {
    this.productService.onQuantityChange(Id, event.target.value);
  }

  removeItem(Id) {
    this.productService.removeItemFromCart(Id);
    this.notificationService.showInfo('Product removed!', '');
  }

  checkOut() {
    if (
      this.cartItems != null &&
      this.cartItems != undefined &&
      this.cartItems.length != 0
    ) {
      this.router.navigate(['/checkout']);
    } else {
      this.notificationService.showError(
        'There are no items in your cart. Add some :)',
        ''
      );
    }
  }
}
