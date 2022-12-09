import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { UserService } from '../../../model/user/user.service';
import { ICreateUser, IUser } from '../../../model/user/user.interface';
import { RoleService } from '../../../model/role/role.service';
import { IRole } from '../../../model/role/role.interface';
import { IProductBase } from '../../../model/product/product.model';

@Component({
  selector: 'app-user-edit',
  styleUrls: ['userEditor.component.scss'],
  templateUrl: 'userEditor.component.html',
})
export class UserEditorComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() user: IUser | null;

  @Output() closeEditor = new EventEmitter<void | IUser>();

  public userForm: FormGroup;
  roles$: BehaviorSubject<IRole[] | null> = new BehaviorSubject<IRole[] | null>(
    null
  );
  private avatar: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  private isAvatarUpload: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private wallpaper: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);
  private isWallpaperUpload: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private roleService: RoleService
  ) {
    this.roleService.getAll().subscribe((res) => this.roles$.next(res));
  }

  ngOnInit(): void {
    console.log(this.user);
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
      password: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      number: new FormControl({ value: this.user?.number, disabled: false }, [
        Validators.required,
      ]),
      email: new FormControl({ value: this.user?.email, disabled: false }, [
        Validators.required,
      ]),
      address: new FormControl({ value: this.user?.address, disabled: false }, [
        Validators.required,
      ]),
      role_id: new FormControl({ value: this.user?.role.id, disabled: false }, [
        Validators.required,
      ]),
    });
  }

  save() {
    const data = this.userForm.value;

    const newAvatar = this.isEdit
      ? this.avatar.value ?? this.user?.avatar
      : this.avatar.value;

    const newWallpaper = this.isEdit
      ? this.avatar.value ?? this.user?.avatar
      : this.avatar.value;

    const newUser: ICreateUser = {
      first_name: data.first_name,
      login: data.login,
      password: data.password,
      avatar: newAvatar,
      wallpaper: newWallpaper,
      number: data.number,
      email: data.email,
      address: data.address,
      role_id: data.role_id,
      last_name: data.last_name,
    };
    console.log(newUser);

    if (this.isEdit && this.user) {
      this.userService.patchById(newUser, this.user.id).subscribe({
        next: (res) => {
          console.log(res);
          this.closeEditor.emit();
        },
        error: (e) => console.log(e.statusText),
      });
    } else {
      this.userService.create(newUser).subscribe({
        next: (res) => {
          console.log(res);
          this.closeEditor.emit();
        },
        error: (e) => console.log(e.statusText),
      });
    }
  }

  closeEdit(user?: IUser) {
    this.closeEditor.emit(user);
  }

  checkValid(control: string) {
    if (['avatar', 'wallpaper'].some((e) => e === control)) return true;
    else if ('password' === control)
      return this.isEdit || this.userForm.controls[control].valid;
    return this.userForm.controls[control].valid;
  }

  log(errors: ValidationErrors | null) {
    console.log(this.userForm.value);
  }

  onAvatarChange(event: any) {
    if (!event.target.files || !event.target.files[0]) return;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.avatar.next(reader.result as string);
      this.isAvatarUpload.next(false);
    };
  }

  onWallpaperChange(event: any) {
    if (!event.target.files || !event.target.files[0]) return;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.wallpaper.next(reader.result as string);
      this.isWallpaperUpload.next(false);
    };
  }
}
