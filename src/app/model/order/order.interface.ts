export interface IOrder {
  id: number;
  name: string;
  address: string;
  city: string;
  counry: string;
  zip: string;
  shipped: boolean;
}

export interface ICreateOrder {
  name: string;
  address: string;
  city: string;
  counry: string;
  zip: string;
  shipped: boolean;
}
