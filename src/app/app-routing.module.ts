import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'product', component:  ProductComponent},
  { path: 'cart', component:  CartComponent},
  { path: 'checkout', component:  CheckoutComponent},
  { path: 'add-product', component:  AddProductComponent},
  { path: 'my-account', component:  MyAccountComponent},
  { path: 'inventory', component:  InventoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
