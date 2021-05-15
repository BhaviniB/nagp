import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import dataFromJson from 'src/app/shared/inmemory/products.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ThrowStmt } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class ProductService {
  currentProduct: any;
  allProducts: any[] = [];

  public currentCartSubject: BehaviorSubject<Product[]>;
  public currentCart: Observable<Product[]>;

  public allProductsSubject: BehaviorSubject<Product[]>;
  public currentLang: BehaviorSubject<string>;

  public cart: Product[] = [];
  constructor(private router: Router) {
    this.currentCartSubject = new BehaviorSubject<Product[]>([]);
    this.currentCart = this.currentCartSubject.asObservable();
    this.currentLang = new BehaviorSubject<string>('English');

    this.allProducts = JSON.parse(JSON.stringify(dataFromJson));
    this.allProductsSubject = new BehaviorSubject<Product[]>(dataFromJson);
    this.cart = [];
    if (
      localStorage.cart != undefined &&
      localStorage.cart != null &&
      localStorage.cart != []
    ) {
      this.cart = JSON.parse(localStorage.cart);
    }
  }


  addItemToCart(currentItem) {
    var jdx = this.cart.findIndex((x) => x.Id === currentItem.Id);
    if (jdx != -1) {
      this.cart[jdx].quantity += Number(currentItem.quantity);
    } else {
      this.cart.push(currentItem);
    }
    this.saveCart();
    this.router.navigate(['/cart']);
  }

  saveCart() {
    if (window.localStorage) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.currentCartSubject.next(this.cart);
    }
  }

  removeItemFromCart(Id) {
    var idx = this.cart.findIndex((x) => x.Id === Id);
    this.cart.splice(idx, 1);
    this.saveCart();
    this.viewCart();
  }
  viewCart() {
    this.router.navigate(['/cart']);
  }

  filterByCategory(category) {
    let res;
    if (category == 'All') {
      res = this.allProducts;
    } else {
      res = this.allProducts.filter((product) => product.category == category);
    }

    this.allProductsSubject.next(res);
  }

  onQuantityChange(id, quantity) {
    var idx = JSON.parse(localStorage.cart).findIndex((x) => x.Id === id);
    var jdx = this.cart.findIndex((x) => x.Id === id);

    JSON.parse(localStorage.cart)[idx].quantity = quantity;
    this.cart[jdx].quantity = quantity;

    this.saveCart();
  }

  filterByPrice(price) {
    let res;
    if (price == 'Less than 500') {
      res = this.allProducts.filter((product) => product.price < 500);
    } else if (price == '500 to 1000') {
      res = this.allProducts.filter(
        (product) => product.price > 500 && product.price <= 1000
      );
    } else if (price == '1000 and above') {
      res = this.allProducts.filter((product) => product.price > 1000);
    } else {
      res = this.allProducts;
    }

    this.allProductsSubject.next(res);
  }
}
