import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../model/user/user.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IRole } from '../../../model/role/role.interface';
import { UserService } from '../../../model/user/user.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit {
  user: IUser;
  userForm: FormGroup;

  public avatar: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  private isAvatarUpload: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public wallpaper: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  private isWallpaperUpload: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.initUser();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: new FormControl(
        { value: this.user?.first_name, disabled: false },
        Validators.required
      ),
      last_name: new FormControl(
        { value: this.user?.last_name, disabled: false },
        Validators.required
      ),
      login: new FormControl(
        { value: this.user?.login, disabled: false },
        Validators.required
      ),
      password: new FormControl({ value: '', disabled: false }),
      number: new FormControl({ value: this.user?.number, disabled: false }, [
        Validators.required,
      ]),
      email: new FormControl({ value: this.user?.email, disabled: false }, [
        Validators.required,
      ]),
      address: new FormControl({ value: this.user?.address, disabled: false }, [
        Validators.required,
      ]),
    });
  }

  private initUser() {
    const data = window.localStorage.getItem('user');
    if (!data) return;

    const parsedData = JSON.parse(data);
    if (parsedData) this.user = parsedData;
  }

  checkValid(control: string) {
    return this.userForm.controls[control].valid;
  }

  cancel() {}

  save() {
    const data = this.userForm.value;
    const avatar = this.isAvatarUpload.value
      ? this.avatar.value
      : this.user.avatar;
    const wallpaper = this.isWallpaperUpload.value
      ? this.wallpaper.value
      : this.user.wallpaper;

    const putUser: Omit<IUser, 'id'> = {
      first_name: data.first_name,
      login: data.login,
      password: data.password === '' ? this.user.password : data.password,

      number: data.number,
      email: data.email,
      address: data.address,
      role: this.user.role,
      last_name: data.last_name,
      avatar: avatar,
      wallpaper: wallpaper,
    };

    this.userService.patchById(putUser, this.user.id).subscribe((res) => {
      if (res) {
        window.localStorage.setItem('user', JSON.stringify(res));
      }
    });
  }

  OnAvatarChange(event: any) {
    if (!event.target.files || !event.target.files[0]) return;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.avatar.next(reader.result as string);
      this.isAvatarUpload.next(true);
    };
  }

  onWallpaperChange(event: any) {
    if (!event.target.files || !event.target.files[0]) return;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.wallpaper.next(reader.result as string);
      this.isWallpaperUpload.next(true);
    };
  }
}
