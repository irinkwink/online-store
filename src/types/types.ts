import CartPageController from '../components/controller/cartPage/cartPageController';
import CatalogPageController from '../components/controller/catalogPage/catalogPageController';
import Page404Controller from '../components/controller/page404/page404Controller';
import ProductPageController from '../components/controller/productPage/productPageController';
import { FormInputs } from './enums';

export type Routes = {
  404: Page404Controller;
  '/': CatalogPageController;
  '/product.html': ProductPageController;
  '/cart.html': CartPageController;
};

export type Controllers = [CatalogPageController, ProductPageController, CartPageController, Page404Controller];
// export type Controller = CatalogPageController | ProductPageController | CartPageController | Page404Controller;

export type Developers = {
  name: string;
  githubUrl: string;
  githubName: string;
};

export type MinMax = {
  min: number;
  max: number;
};

export type SearchParam = {
  key: string;
  value: string;
};

export type SortOption = {
  value: string;
  text: string;
};

export type CartTotal = {
  productsNum: number;
  totalPrice: number;
};

export type HeaderCartInfo = {
  id: string;
  text: string;
  end: string;
  total: number;
};

export type FieldSelect = {
  id: string;
  title: string;
  text: string;
  elem: string;
};

type RangeInput = {
  id: string;
  class: string;
  name: string;
  value: number;
  min: number;
  max: number;
};

export type FieldRange = {
  id: string;
  title: string;
  range: RangeInput[];
};

export type FieldTypes = FieldSelect | FieldRange;

export type FiltersValues = {
  sort: string;
  search: string;
  category: string;
  brand: string;
  price: MinMax;
  stock: MinMax;
  priceFilter: MinMax;
  stockFilter: MinMax;
};

export type PromoCodes = {
  STUDENT1: number;
  RSS: number;
  EPAM: number;
  NEWYEAR: number;
};

export type OrderFormInput = {
  id: keyof typeof FormInputs;
  type: string;
  placeholder: string;
  label: string;
};
