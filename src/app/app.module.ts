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
import { ProductComponent } from './shared/component/product/product.component';
import { AboutComponent } from './shared/component/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './shared/component/user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetConfirmComponent } from './get-confirm/get-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UsersDashComponent,
    UsersFormComponent,
    HomeComponent,
    ProductComponent,
    AboutComponent,
    UserDetailsComponent,
    GetConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
