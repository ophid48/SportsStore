import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBase } from '../httpbase/http-base.service';
import { IRole } from './role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends HttpBase<IRole> {
  constructor(http: HttpClient) {
    super(http, '/api/v1/roles');
  }
}
