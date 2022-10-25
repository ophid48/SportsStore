import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';
import { ProductTableComponent } from './admin-product/productTable.component';
import { ProductEditorComponent } from './admin-product/productEditor.component';
import { OrderTableComponent } from './admin-order/orderTable.component';
import { UserTableComponent } from './admin-user/user-table/user-table.component';
import { UserCreateComponent } from './admin-user/user-create/user-create.component';
import { IgxGridModule } from 'igniteui-angular';

let routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  {
    path: 'main',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'products/:mode/:id', component: ProductEditorComponent },
      { path: 'products/:mode', component: ProductEditorComponent },
      { path: 'products', component: ProductTableComponent },
      { path: 'orders', component: OrderTableComponent },
      { path: 'users/:mode/:id', component: UserTableComponent },
      { path: 'users/:mode', component: UserTableComponent },
      { path: 'users', component: UserTableComponent },
      { path: '**', redirectTo: 'products' },
    ],
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing, IgxGridModule],
  providers: [AuthGuard],
  declarations: [
    AuthComponent,
    AdminComponent,
    ProductTableComponent,
    ProductEditorComponent,
    OrderTableComponent,
    UserTableComponent,
    UserCreateComponent,
  ],
})
export class AdminModule {}
