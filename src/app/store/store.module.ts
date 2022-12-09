import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { StoreComponent } from './store.component';
import { CounterDirective } from './counter.directive';
import { CartSummaryComponent } from './cartSummary.component';
import { CartDetailComponent } from './cartDetail.component';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SportStoreComponent } from './sport-store/sport-store.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { IonicModule } from '@ionic/angular';
import { IgxInputGroupModule, IgxSelectModule } from 'igniteui-angular';
import { SportAdminComponent } from './sport-admin/sport-admin.component';
import { ProductEditorComponent } from './sport-admin/admin-product/productEditor.component';
import { OrderRepository } from '../model/order/order.repository';
import { ProductTableComponent } from './sport-admin/admin-product/productTable.component';
import { UserEditorComponent } from './sport-admin/user/userEditor.component';
import { UserTableComponent } from './sport-admin/user/userTable.component';

@NgModule({
  imports: [
    ModelModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    IonicModule,
    IgxInputGroupModule,
    ReactiveFormsModule,
    IgxSelectModule,
  ],
  declarations: [
    StoreComponent,
    CounterDirective,
    CartSummaryComponent,
    CartDetailComponent,
    CheckoutComponent,
    NavBarComponent,
    SportStoreComponent,
    AboutComponent,
    AccountComponent,
    UserEditorComponent,
    UserTableComponent,
    SportAdminComponent,
    ProductEditorComponent,
    ProductTableComponent,
  ],
  exports: [
    StoreComponent,
    CartDetailComponent,
    CheckoutComponent,
    SportStoreComponent,
    NavBarComponent,
  ],
})
export class StoreModule {}
