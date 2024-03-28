import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './header/home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AddProductComponent} from "./add-product/add-product.component";
import {InventoryComponent} from "./inventory/inventory.component";

import { ProductComponent } from './product/product.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LiquorHomeComponent } from './liquor-home/liquor-home.component';
import {SharedService} from "./services/shared/shared.service";
import { MyAccountComponent } from './my-account/my-account.component';
import {NgxPaginationModule} from "ngx-pagination";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    AddProductComponent,
    InventoryComponent,
    MyAccountComponent,
    LiquorHomeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIf,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,



  ],
  providers: [ SharedService,ProductComponent,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
