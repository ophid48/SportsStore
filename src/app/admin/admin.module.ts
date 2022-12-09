import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth.guard';

let routing = RouterModule.forChild([
  // { path: 'auth', component: AuthComponent },
  // {
  //   path: 'main',
  //   component: AdminComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     // { path: 'products/:mode/:id', component: UserEditorComponent },
  //     // { path: 'products/:mode', component: UserEditorComponent },
  //     // { path: 'products', component: UserTableComponent },
  //     // { path: 'orders', component: OrderTableComponent },
  //     // { path: 'users/:mode/:id', component: UserCreateComponent },
  //     // { path: 'users/:mode', component: UserCreateComponent },
  //     // { path: 'users', component: UserTableComponent },
  //     // { path: '**', redirectTo: 'products' },
  //   ],
  // },
  // { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule],
  providers: [AuthGuard],
  declarations: [AuthComponent],
})
export class AdminModule {}
