import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../model/user/user.service';
import { IUser } from '../../../model/user/user.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  users$: BehaviorSubject<IUser[] | null> = new BehaviorSubject<IUser[] | null>(
    null
  );

  selectedUser: IUser;

  isEdit = false;
  isOpen = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getAll()
      .subscribe((response) => this.users$.next(response));
  }

  deleteUser(id: number) {
    this.userService.deleteById(id).subscribe(() => {
      const oldData = this.users$.value ?? [];
      this.users$.next([...oldData.filter((f) => f.id !== id)]);
    });
  }

  closeEditor() {
    console.log('Exit');
    this.isOpen = false;
    this.isEdit = false;
  }

  editUser(user: IUser) {
    this.selectedUser = user;
    this.isEdit = true;
    this.isOpen = true;
  }
}
