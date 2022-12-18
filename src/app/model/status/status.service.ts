import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBase } from '../httpbase/http-base.service';
import { IStatus } from './status.interface';

@Injectable({
  providedIn: 'root',
})
export class StatusService extends HttpBase<IStatus> {
  constructor(http: HttpClient) {
    super(http, '/api/v1/status');
  }
}
