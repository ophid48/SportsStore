import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../model/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  templateUrl: 'admin.component.html',
})
export class AdminComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  logout() {
    this.auth.clear();
    this.router.navigateByUrl('/');
  }
}
