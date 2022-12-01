import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';
import { RouterModule, Routes } from '@angular/router';

import { StoreFirstGuard } from './storeFirst.guard';

import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SportStoreComponent } from './store/sport-store/sport-store.component';
import { AdminComponent } from './admin/admin.component';

import { AboutComponent } from './store/about/about.component';
import { AccountComponent } from './store/account/account.component';
import { IonicModule } from '@ionic/angular';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

let routing: Routes = [
  { path: 'catalog', component: SportStoreComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent },
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
  providers: [StoreFirstGuard, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
