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
  btnState?: boolean;
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
  onlineStoreSettings: {
    cart: ICartProduct[];
    promoСodes: string[];
  };
}

export interface IProductInLS {
  id: number | null;
  num: number;
  btnState?: boolean;
}
