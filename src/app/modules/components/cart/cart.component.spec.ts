import { NotificationService } from './../../../shared/services/notification.service';
import { ProductService } from './../../../shared/services/product.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './cart.component';
import { BehaviorSubject } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports:[ TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot()],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('checking the instance of Product Service', () => {


    const productService = fixture.debugElement.injector.get(ProductService);
    expect(productService.currentCartSubject).toBeInstanceOf(BehaviorSubject);

   });

   it('should call notificationService showSuccess on component load', () => 
   {
    const notificationService = fixture.debugElement.injector.get(NotificationService);

     const spy = spyOn(notificationService, 'showSuccess');
     component.ngOnInit();
     fixture.detectChanges();
     expect(spy).toHaveBeenCalled();
   });
 


   it("should call the Product Service's removeItemFromCart()", () => {
    const productService = fixture.debugElement.injector.get(ProductService);
    spyOn(productService, 'removeItemFromCart');

    productService.removeItemFromCart(1);
    fixture.detectChanges();
    expect(productService.removeItemFromCart).toHaveBeenCalled();
  });

  
  it("should call the Product Service's onQuantityChange()", () => {
    const productService = fixture.debugElement.injector.get(ProductService);
    spyOn(productService, 'onQuantityChange');

    productService.onQuantityChange(null,1);
    fixture.detectChanges();
    expect(productService.onQuantityChange).toHaveBeenCalled();
  });

  it('should render Your Cart in a h2 tag', () => {
    const fixture = TestBed.createComponent(CartComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Your Cart');
  });

});
