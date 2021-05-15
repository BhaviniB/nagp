import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from '@app-login/login.module';
import { CoreModule } from '@app-core/core.module';
import { HomeModule } from './modules/home.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendHttpInterceptor } from '@app-core/interceptors/BackendIntercetor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    CoreModule,
    HomeModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendHttpInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
