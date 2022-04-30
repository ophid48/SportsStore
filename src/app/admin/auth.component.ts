import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import {AuthService} from "../model/auth.service";

@Component({
  templateUrl: "auth.component.html"
})
export class AuthComponent {
  // @ts-ignore
  public username: string;
  // @ts-ignore
  public password: string;
  // @ts-ignore
  public errorMessage: string;

  constructor(private router: Router,
              private auth: AuthService) {}

  authenticate(form: NgForm) {
    if (form.valid) {
      this.auth.authenticate(this.username, this.password)
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl("/admin/main");
          }
          this.errorMessage = "Authentification Failed"
        })
    } else {
      this.errorMessage = "Form Data Invalid";
    }
  }
}
