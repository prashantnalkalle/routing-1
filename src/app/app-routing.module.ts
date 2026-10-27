import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDashComponent } from './shared/component/users-dash/users-dash.component';
import { HomeComponent } from './shared/component/home/home.component';
import { ProductComponent } from './shared/component/product/product.component';
import { AboutComponent } from './shared/component/about/about.component';
import { UserDetailsComponent } from './shared/component/user-details/user-details.component';
import { UsersFormComponent } from './shared/component/users-form/users-form.component';

const routes: Routes = [
  { path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', 
    component: HomeComponent  
  },
  { path: 'users', 
    component: UsersDashComponent 
  },
  {
    path:'users/add',
    component:UsersFormComponent
  },
  {
    path:'users/:id',
    component:UserDetailsComponent
  },
  {
    path:'users/:id/edit',
    component:UsersFormComponent
  }, 
  { path: 'product', 
    component: ProductComponent  
  },
  { path: 'about', 
    component: AboutComponent  
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
