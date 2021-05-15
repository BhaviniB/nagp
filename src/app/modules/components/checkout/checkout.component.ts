import { Router } from '@angular/router';
import { NotificationService } from './../../../shared/services/notification.service';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  cartItems;
  isApplyDiscountClicked: boolean = false;
  ngOnInit(): void {
    this.createForm();
    this.cartItems = this.productService.cart;
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

  submit() {
    const formData = this.form.value;
    localStorage.removeItem('cart');
    this.productService.cart = [];

    this.productService.currentCartSubject.next([]);
    this.notificationService.showSuccess('Your order has been placed', '');
    this.router.navigate(['/product-grid']);
  }

  applyDiscount() {
    this.isApplyDiscountClicked = true;
    this.notificationService.showSuccess('Discount applied', '');

    let total = this.getTotal();
    let discountedPrice = total / 2;
    return discountedPrice;
  }
  createForm() {
    this.form = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],

      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      state: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      zip: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(8),
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
      ],
      country: ['', Validators.required],
    });
  }
}
