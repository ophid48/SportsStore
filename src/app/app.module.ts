import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';
import { RouterModule, Routes } from '@angular/router';

import { StoreFirstGuard } from './storeFirst.guard';

import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SportStoreComponent } from './store/sport-store/sport-store.component';

import { AboutComponent } from './store/about/about.component';
import { AccountComponent } from './store/account/account.component';
import { IonicModule } from '@ionic/angular';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { SportAdminComponent } from './store/sport-admin/sport-admin.component';
import { ProductEditorComponent } from './store/sport-admin/admin-product/productEditor.component';
import { ProductTableComponent } from './store/sport-admin/admin-product/productTable.component';
import { OrderTableComponent } from './store/sport-admin/admin-order/orderTable.component';
import { UserEditorComponent } from './store/sport-admin/user/userEditor.component';
import { UserTableComponent } from './store/sport-admin/user/userTable.component';
import { ProductService } from './model/product/product.service';
import { HttpClient } from '@angular/common/http';

registerLocaleData(localeRu);

let routing: Routes = [
  { path: 'catalog', component: SportStoreComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin',
    component: SportAdminComponent,
  },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: AccountComponent },
  { path: '**', redirectTo: 'catalog' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routing),
    // RouterModule.forRoot([
    //   {
    //     path: 'catalog',
    //     component: SportStoreComponent,
    //     canActivate: [StoreFirstGuard],
    //   },
    //   {
    //     path: 'cart',
    //     component: CartDetailComponent,
    //     canActivate: [StoreFirstGuard],
    //   },
    //   {
    //     path: 'checkout',
    //     component: CheckoutComponent,
    //     canActivate: [StoreFirstGuard],
    //   },
    //   {
    //     path: 'admin',
    //     component: AdminComponent,
    //     // loadChildren: () =>
    //     //   import('./admin/admin.module').then((m) => m.AdminModule),
    //     canActivate: [StoreFirstGuard],
    //   },
    //   {
    //     path: '**',
    //     redirectTo: '/catalog',
    //   },
    // ]),
    BrowserAnimationsModule,
  ],
  providers: [
    StoreFirstGuard,
    { provide: ProductService, deps: [HttpClient] },
    [CookieService],
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
