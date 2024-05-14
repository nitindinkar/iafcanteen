
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
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
import { NgxPaginationModule } from 'ngx-pagination';
import {WishlistComponent} from "./wishlist/wishlist.component";
import { AddCategoryComponent } from './add-category/add-category.component';
import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminComponent } from './admin/admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RegistrationComponent } from './registration/registration.component';
import { IonicModule } from '@ionic/angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { ManageStoreComponent } from './manage-store/manage-store.component';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {ProductFilteredComponent} from "./product-filtered/product-filtered.component";
import { SuperAdminNotificationComponent } from './super-admin-notification/super-admin-notification.component';
import { AdminMyAccountComponent } from './admin-my-account/admin-my-account.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    ProductFilteredComponent,
    CartComponent,
    CheckoutComponent,
    AddProductComponent,
    InventoryComponent,
    MyAccountComponent,
    LiquorHomeComponent,
    WishlistComponent,
    AddCategoryComponent,
    AdminComponent,
    RegistrationComponent,
    ManageOrdersComponent,
    OrderDetailsDialogComponent,
    ManageAdminsComponent,
    ManageStoreComponent,
    SuperadminDashboardComponent,
    AdminDashboardComponent,
    SuperAdminNotificationComponent,
    AdminMyAccountComponent,







  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIf,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BaseChartDirective,
    FontAwesomeModule,
    IonicModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    NgxPageScrollCoreModule,


  ],

  providers: [ SharedService,ProductComponent,HeaderComponent,InventoryComponent,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
