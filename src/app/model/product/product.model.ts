export class Product {
  constructor(
    public id?: number,
    public name?: string,
    public category?: number,
    public description?: string,
    public price?: number
  ) {}
}

export interface IProduct {
  product_name: string;
  description: string;
  price: number;
  material: string;
  size: string;
  weight: number;
  colors: string;
  categoryId: number;
  id: number;
  category: {
    category_name: 'string';
    id: number;
  };
}
