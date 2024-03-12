import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AddProductComponent} from "./add-product/add-product.component";
const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'add-product', component:  AddProductComponent},
  { path: 'login', component:  LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
