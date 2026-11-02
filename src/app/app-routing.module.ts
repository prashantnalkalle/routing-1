import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDashComponent } from './shared/component/users-dash/users-dash.component';
import { HomeComponent } from './shared/component/home/home.component';
import { AboutComponent } from './shared/component/about/about.component';
import { UserDetailsComponent } from './shared/component/user-details/user-details.component';
import { UsersFormComponent } from './shared/component/users-form/users-form.component';
import { ProductDashComponent } from './shared/component/product-dash/product-dash.component';
import { ProductCardComponent } from './shared/component/product-card/product-card.component';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', 
    component:AuthComponent
  },
  { path: 'home', 
    component: HomeComponent  
  },
  { path: 'users', 
    component: UsersDashComponent ,
    children:[
       {
    path:'add',
    component:UsersFormComponent
  },
  {
    path:':id',
    component:UserDetailsComponent
  },
  {
    path:':id/edit',
    component:UsersFormComponent
  }, 
    ]
  },
  { path: 'about', 
    component: AboutComponent  
  },
  { path: 'auth', component: AuthComponent },
  {
    path:'products',
    component:ProductDashComponent
  },
  {
    path:'products/add',
    component:ProductFormComponent
  },
  {
    path:'products/:id',
    component:ProductCardComponent
  },
  {
    path:'products/:id/edit',
    component:ProductFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
