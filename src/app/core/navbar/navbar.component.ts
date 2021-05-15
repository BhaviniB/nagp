import { NotificationService } from './../../shared/services/notification.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import dataFromJson from 'src/app/shared/inmemory/products.json';
import { User } from 'src/app/shared/models/user';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser = new User();
  public searchInput: string;
  allProducts: Product[];
  isLoggedIn: boolean;
  currentLang: string;

  constructor(
    public translate: TranslateService,
    private productService: ProductService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    translate.addLangs(['English', 'Hindi']);
    translate.setDefaultLang('English');
  }

  ngOnInit(): void {

    this.productService.currentLang.subscribe((res) => {
      this.currentLang = res;
    });
    this.authenticationService.currentUserSubject.subscribe((res) => {
      if (res) {
        this.currentUser.username = res.username.slice(1, -1);
        this.isLoggedIn = true;
      } else {
        this.currentUser.username = null;
        this.isLoggedIn = false;
      }
    });

    if (localStorage.getItem('username')) {

      this.currentUser.username = localStorage.getItem('username').slice(1, -1);
      this.isLoggedIn = true;
    }
    this.allProducts = dataFromJson;
  }

  switchLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(this.currentLang);
    this.productService.currentLang.next(lang);
  }
  viewCart() {
    this.productService.viewCart();
  }

  home() {
    this.router.navigate(['/product-grid']);
  }
  login() {
    this.isLoggedIn = true;

    this.router.navigate(['/login']);
  }

  logout() {
    this.isLoggedIn = false;
    this.authenticationService.logout();
    this.notificationService.showInfo("You have been logged out!","")
  }
  filterByCategory(category) {
    this.productService.filterByCategory(category);
  }
}
