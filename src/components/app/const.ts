import { FormInputs, PromoCodesDiscount } from '../../types/enums';
import {
  Developers,
  FieldRange,
  FieldSelect,
  FiltersValues,
  HeaderCartInfo,
  OrderFormInput,
  SortOption,
} from '../../types/types';

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
    text: 'Items in Cart:',
    end: '',
    total: 0,
  },
  {
    id: 'price',
    text: 'Total price:',
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
        max: 0,
      },
      {
        id: 'priceToSlider',
        class: 'to',
        name: 'priceTo',
        value: 0,
        min: 0,
        max: 0,
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
        max: 0,
      },
      {
        id: 'stockToSlider',
        class: 'to',
        name: 'stockTo',
        value: 0,
        min: 0,
        max: 0,
      },
    ],
  },
];

export const INITIAL_FILTERS: FiltersValues = {
  sort: 'none',
  search: '',
  category: 'all',
  brand: 'all',
  price: {
    min: 0,
    max: 0,
  },
  stock: {
    min: 0,
    max: 0,
  },
  priceFilter: {
    min: 0,
    max: 0,
  },
  stockFilter: {
    min: 0,
    max: 0,
  },
};

export const PROMO_CODES = {
  STUDENT1: PromoCodesDiscount.STUDENT1,
  RSS: PromoCodesDiscount.RSS,
  EPAM: PromoCodesDiscount.EPAM,
  NEWYEAR: PromoCodesDiscount.NEWYEAR,
};

export const PERSON_DETAILS: OrderFormInput[] = [
  {
    id: FormInputs.name,
    type: 'text',
    placeholder: 'Name Surname',
    label: 'should include Name and Surname (at least 3 letters each)',
  },
  {
    id: FormInputs.phone,
    type: 'tel',
    placeholder: 'Phone number',
    label: 'must start with + and include at least 9 digits',
  },
  {
    id: FormInputs.email,
    type: 'email',
    placeholder: 'E-mail',
    label: 'should match the format: mail@example.com',
  },
  {
    id: FormInputs.address,
    type: 'text',
    placeholder: 'Address',
    label: 'must include three words (at least 5 letters each)',
  },
];

export const CARD_DETAILS: OrderFormInput[] = [
  {
    id: FormInputs.cardNumber,
    type: 'number',
    placeholder: 'Card number',
    label: 'should include 16 digits',
  },
  {
    id: FormInputs.validDate,
    type: 'text',
    placeholder: 'Valid thru',
    label: '**/**',
  },
  {
    id: FormInputs.cvvCode,
    type: 'number',
    placeholder: 'CVV',
    label: '***',
  },
];
