
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {AddProductComponent} from "./add-product/add-product.component";
import {MyAccountComponent} from "./my-account/my-account.component";
import {InventoryComponent} from "./inventory/inventory.component";
import { LiquorHomeComponent } from './liquor-home/liquor-home.component';
import {WishlistComponent} from "./wishlist/wishlist.component";
import { ContactUsComponent } from './contact-us/contact-us.component';
import {AddCategoryComponent} from "./add-category/add-category.component";
import { AdminComponent } from './admin/admin.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { RegistrationComponent } from './registration/registration.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';


const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'liquor', component:  LiquorHomeComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'product', component:  ProductComponent},
  { path: 'cart', component:  CartComponent},
  { path: 'checkout', component:  CheckoutComponent},
  { path: 'add-product', component:  AddProductComponent},
  { path: 'add-category', component:  AddCategoryComponent},
  { path: 'my-account', component:  MyAccountComponent},
  { path: 'inventory', component:  InventoryComponent},
  { path: 'wishlist', component:  WishlistComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'manage-admin', component: ManageAdminComponent},
  { path: 'registration', component: RegistrationComponent},
  { path:  'manage-orders', component:ManageOrdersComponent},
 
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
