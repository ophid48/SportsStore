export class Product {
  constructor(
    public id?: number,
    public name?: string,
    public category?: number,
    public description?: string,
    public price?: number
  ) {}
}

export interface IProductBase {
  product_name: string;
  description: string;
  price: number;
  material: string;
  size: string;
  weight: number;
  categoryId: number;
}

export interface IProduct extends IProductBase {
  category: {
    category_name: 'string';
    id: number;
  };
  id: number;
}
