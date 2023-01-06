import { Developers, FieldRange, FieldSelect, HeaderCartInfo, SortOption } from '../../types/types';

export const THUMB_WIDTH = 80;
export const THUMBS_GAP = 4;

export const WIDTH_TWO_ELEMS = THUMB_WIDTH * 2 + THUMBS_GAP;
export const WIDTH_THREE_ELEMS = THUMB_WIDTH * 3 + THUMBS_GAP * 2;

export const SLIDER_MOVE = THUMB_WIDTH + THUMBS_GAP;

export const DEVELOPERS: Developers[] = [
  {
    name: 'Irina Nazarova',
    githubUrl: 'https://github.com/irinkwink',
    githubName: 'irinkwink',
  },
  {
    name: 'Evgenia Bublikova',
    githubUrl: 'https://github.com/devbublik',
    githubName: 'devbublik',
  },
];

export const HEADER_CART_INFO: HeaderCartInfo[] = [
  {
    id: 'number',
    text: 'Products in cart:',
    end: '',
    total: 0,
  },
  {
    id: 'amount',
    text: 'Total amount:',
    end: '$',
    total: 0,
  },
];

export const SORT_OPTIONS: SortOption[] = [
  {
    value: 'none',
    text: 'Sort: none',
  },
  {
    value: 'priceLowtoHigh',
    text: 'Price: Low to High',
  },
  {
    value: 'priceHightoLow',
    text: 'Price: High to Low',
  },
  {
    value: 'rating',
    text: 'Rating',
  },
  {
    value: 'discount',
    text: 'Discount',
  },
];

export const SELECT_FIELDS: FieldSelect[] = [
  {
    id: 'category',
    title: 'Category',
    text: 'All categories',
    elem: 'categorySelectElem',
  },
  {
    id: 'brand',
    title: 'Brand',
    text: 'All brands',
    elem: 'brandSelectElem',
  },
];

export const RANGE_FIELDS: FieldRange[] = [
  {
    id: 'price',
    title: 'Price',
    range: [
      {
        id: 'priceFromSlider',
        class: 'from',
        name: 'priceFrom',
        value: 0,
        min: 0,
        max: 1000,
      },
      {
        id: 'priceToSlider',
        class: 'to',
        name: 'priceTo',
        value: 1000,
        min: 0,
        max: 1000,
      },
    ],
  },
  {
    id: 'stock',
    title: 'Stock',
    range: [
      {
        id: 'stockFromSlider',
        class: 'from',
        name: 'stockFrom',
        value: 0,
        min: 0,
        max: 1000,
      },
      {
        id: 'stockToSlider',
        class: 'to',
        name: 'stockTo',
        value: 1000,
        min: 0,
        max: 1000,
      },
    ],
  },
];
