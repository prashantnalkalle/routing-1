import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UsersDashComponent } from './shared/component/users-dash/users-dash.component';
import { UsersFormComponent } from './shared/component/users-form/users-form.component';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './shared/component/home/home.component';
import { AboutComponent } from './shared/component/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './shared/component/user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetConfirmComponent } from './get-confirm/get-confirm.component';
import { ProductDashComponent } from './shared/component/product-dash/product-dash.component';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';
import { ProductCardComponent } from './shared/component/product-card/product-card.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UsersDashComponent,
    UsersFormComponent,
    HomeComponent,
    AboutComponent,
    UserDetailsComponent,
    GetConfirmComponent,
    ProductDashComponent,
    ProductFormComponent,
    ProductCardComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
