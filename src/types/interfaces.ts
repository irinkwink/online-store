export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  num?: number;
}

export interface IProductsData {
  products: IProduct[];
}

export interface ICartProduct {
  id: number;
  num: number;
}

export interface IState {
  products: IProduct[];
  cart: ICartProduct[];
}

export interface IProductInLS {
  id: number | null;
  num: number;
}
