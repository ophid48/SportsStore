import { IProduct } from '../product/product.model';
import { IUser } from '../user/user.interface';
import { IStatus } from '../status/status.interface';

export interface IOrder {
  id: number;
  address: string;
  city: string;
  country: string;
  zip: string;
  statusid: number;
  status: IStatus;
  products: IProduct[];
  users: IUser[];
  desc: string;
}

export interface ICreateOrder {
  address: string;
  city: string;
  country: string;
  zip: string;
  statusid: number;
  owner: number;
  desc: string;
  courier?: number;
  products?: number[];
}
