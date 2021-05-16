import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

describe('ProductService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
    })
  );

  it('should be created', () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service).toBeTruthy();
  });

  it('checking the currentCartSubject of Product Service', () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service.currentCartSubject).toBeInstanceOf(BehaviorSubject);
  });

  it('checking the currentLang subject of Product Service', () => {
    const service: ProductService = TestBed.get(ProductService);
    expect(service.currentLang).toBeInstanceOf(BehaviorSubject);
  });

  it('should call removeItemFromCart()', () => {
    const service: ProductService = TestBed.get(ProductService);

    spyOn(service, 'removeItemFromCart');

    service.cart = [
      {
        Id: '1',
        name: 'sample',
        price: 100,
        description: 'sample',
        tags: ['cc'],
        category: 'Electronics',
        image: 'sample',
        quantity: 1,
      },
      {
        Id: '2',
        name: 'sample',
        price: 100,
        description: 'sample',
        tags: ['cc'],
        category: 'Electronics',
        image: 'sample',
        quantity: 1,
      },
    ];

    service.removeItemFromCart('1');

    expect(service.removeItemFromCart).toHaveBeenCalledWith('1');
    expect(service.removeItemFromCart).toHaveBeenCalled();
  });

  it('should call addItemToCart()', () => {
    const service: ProductService = TestBed.get(ProductService);
    spyOn(service, 'addItemToCart');
    service.cart = [
      {
        Id: '1',
        name: 'sample name',
        price: 100,
        description: 'sample desc',
        tags: ['electronic'],
        category: 'Electronics',
        image: 'sample',
        quantity: 1,
      },
    ];
    service.addItemToCart({
      Id: '2',
      name: 'sample name',
      price: 100,
      description: 'sample desc',
      tags: ['cc'],
      category: 'Electronics',
      image: 'sample',
      quantity: 1,
    });
    expect(service.addItemToCart).toHaveBeenCalled();
    expect(service.addItemToCart).toHaveBeenCalledWith({
      Id: '2',
      name: 'sample name',
      price: 100,
      description: 'sample desc',
      tags: ['cc'],
      category: 'Electronics',
      image: 'sample',
      quantity: 1,
    });
  });

  it('should call filterByCategory()', () => {
    const service: ProductService = TestBed.get(ProductService);

    const spy = spyOn(service, 'filterByCategory').and.callThrough();
    service.filterByCategory('Electronics');
    expect(service.filterByCategory).toHaveBeenCalled();
    expect(service.filterByCategory).toHaveBeenCalledTimes(1);
    expect(service.filterByCategory).toHaveBeenCalledWith('Electronics');
  });

  it('should call filterByPrice()', () => {
    const service: ProductService = TestBed.get(ProductService);
    service.allProducts = [
      {
        Id: '1',
        name: 'sample name',
        price: 100,
        description: 'sample desc',
        tags: ['cc'],
        category: 'Electronics',
        image: 'sample',
        quantity: 1,
      },
    ];

    const spy = spyOn(service, 'filterByPrice').and.callThrough();
    service.filterByPrice('< ₹ 500');
    expect(service.filterByPrice).toHaveBeenCalled();
    expect(service.filterByPrice).toHaveBeenCalledTimes(1);
    expect(service.filterByPrice).toHaveBeenCalledWith('< ₹ 500');
  });
});
