export interface IProduct {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly discountPercentage: number;
  readonly rating: number;
  readonly stock: number;
  readonly brand: string;
  readonly category: string;
  readonly thumbnail: string;
  readonly images: string[];
}

export interface IProductLS extends IProduct {
  num: number;
  index: number;
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
  error: string;
  onlineStoreSettings: {
    cart: ICartProduct[];
    promoCodes: string[];
  };
}

export interface ICartProduct {
  id: number;
  num: number;
}
