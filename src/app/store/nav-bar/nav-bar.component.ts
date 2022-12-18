import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpAuthService } from '../../model/http-auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICreateUser, IUser } from '../../model/user/user.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  selected = 'catalog';

  isLoginOpen: boolean = false;
  isRegOpen: boolean = false;

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private httpAuthService: HttpAuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      password: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
    });
    this.registerForm = this.fb.group({
      first_name: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      login: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      password: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      number: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      email: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      address: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
    });
  }

  isSelect(test: string) {
    return test === this.selected;
  }

  navClick(str: string) {
    this.selected = str;
    this.router.navigateByUrl('/' + str).then();
  }

  isNoAccess() {
    const data = window.localStorage.getItem('user');
    if (!data) return true;
    let localUser: IUser = JSON.parse(data);
    if (localUser) return localUser.role.role_name !== 'Админ';
    return true;
  }

  checkValid(control: string) {
    if (this.isLoginOpen) {
      return this.loginForm.controls[control].valid;
    } else if (this.isRegOpen) {
      return this.registerForm.controls[control].valid;
    }
    return true;
  }

  login() {
    this.httpAuthService
      .login(this.loginForm.value.login, this.loginForm.value.password)
      .subscribe((res) => {
        this.isLoginOpen = false;
      });
  }

  register() {
    const data = this.registerForm.value;
    const newUser: ICreateUser = {
      first_name: data.first_name,
      login: data.login,
      password: data.password,

      number: data.number,
      email: data.email,
      address: data.address,
      role_id: 3,
    };
    this.httpAuthService.register(newUser).subscribe((res) => {
      this.isRegOpen = false;
    });
  }

  getUserName() {
    console.log(this.httpAuthService.user?.first_name);
    return this.httpAuthService.user?.first_name;
  }
}
