import { AuthGuard } from './../core/guards/auth.guard';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';

import { HomeRoutingModule } from './home-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '@app-core/pipes/filter.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductGridComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
  ],
  exports: [
    ProductDetailComponent,
    ProductGridComponent,
    ProductComponent,
    CartComponent,
  ],
  providers: [AuthGuard],
})
export class HomeModule {}
export function translateHttpLoaderFactory(
  httpBackend: HttpBackend
): TranslateHttpLoader {
  return new TranslateHttpLoader(new HttpClient(httpBackend));
}
