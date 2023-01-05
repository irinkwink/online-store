import PageController from '../components/controller/pageController';

export type Routes = {
  404: PageController;
  '/': PageController;
  '/product.html': PageController;
  '/cart.html': PageController;
};

// export type Controllers = [CatalogPageController, ProductPageController, CartPageController, Page404Controller];
// export type Controller = CatalogPageController | ProductPageController | CartPageController | Page404Controller;

export type MinMax = {
  min: number;
  max: number;
};

export type SearchParam = {
  key: string;
  value: string;
};
