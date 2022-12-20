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
}

export interface IProductsData {
  products: IProduct[];
}

export interface ICartProduct {
  id: number;
  count: number;
}

export interface ICartProductsData {
  cart: ICartProduct[];
}

export interface IState {
  products: IProduct[];
  settings: {
    cart: ICartProduct[];
    catalogPage: {
      display: string;
      sort: string;
      filters: {
        brand: string;
        category: string;
        price: [number, number];
        stock: [number, number];
      };
    };
  };
}
