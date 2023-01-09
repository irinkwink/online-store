import { FieldRange, FieldSelect, FieldTypes, MinMax } from '../../../types/types';
import { RANGE_FIELDS, SELECT_FIELDS } from '../../app/const';
import OverlayView from '../overlay/overlayView';

class FilterView {
  private wrapperElem: HTMLElement | null;
  private overlay: OverlayView;
  private formElem: HTMLFormElement | null;
  private titleElem: HTMLElement | null;
  private categorySelectElem: HTMLSelectElement | null;
  private brandSelectElem: HTMLSelectElement | null;
  private priceInputElems: HTMLInputElement[];
  private stockInputElems: HTMLInputElement[];
  private priceTextElems: HTMLParagraphElement[];
  private stockTextElems: HTMLParagraphElement[];
  private copyBtnElem: HTMLButtonElement | null;
  private resetBtnElem: HTMLButtonElement | null;

  public constructor() {
    this.wrapperElem = null;
    this.overlay = new OverlayView();
    this.formElem = null;
    this.titleElem = null;
    this.categorySelectElem = null;
    this.brandSelectElem = null;
    this.priceInputElems = [];
    this.stockInputElems = [];
    this.priceTextElems = [];
    this.stockTextElems = [];
    this.copyBtnElem = null;
    this.resetBtnElem = null;
  }

  public set wrapper(element: HTMLElement | null) {
    this.wrapperElem = element;
  }

  public get form(): HTMLFormElement | null {
    return this.formElem;
  }

  public get title(): HTMLElement | null {
    return this.titleElem;
  }

  public get copyBtn(): HTMLButtonElement | null {
    return this.copyBtnElem;
  }

  public get resetBtn(): HTMLButtonElement | null {
    return this.resetBtnElem;
  }

  public draw(): void {
    if (this.wrapperElem) {
      this.wrapperElem.append(this.createFormElem());
    }
  }

  private createSelectFieldElem<T extends FieldTypes>(field: T): HTMLFieldSetElement {
    const fieldElem = document.createElement('fieldset');
    fieldElem.className = 'filter__field';

    const titleElem = document.createElement('legend');
    titleElem.className = 'filter__field-title';
    titleElem.textContent = field.title;

    fieldElem.append(titleElem);

    if ('range' in field) {
      const rangeWrapperElem = document.createElement('div');
      rangeWrapperElem.className = 'filter__range-wrapper';

      const labelElem = document.createElement('label');
      labelElem.className = 'filter__range-label';

      const inputElems = field.range.map((input) => {
        const inputElem = document.createElement('input');
        inputElem.className = `filter__range filter__range_${input.class}`;
        inputElem.id = input.id;
        inputElem.type = 'range';
        inputElem.name = input.name;
        inputElem.value = input.value.toString();
        inputElem.min = input.min.toString();
        inputElem.max = input.max.toString();
        inputElem.step = '1';
        return inputElem;
      });

      if (field.id === 'price') {
        this.priceInputElems = [];
        this.priceInputElems.push(...inputElems);
      }
      if (field.id === 'stock') {
        this.stockInputElems = [];
        this.stockInputElems.push(...inputElems);
      }

      const textWrapperElem = document.createElement('div');
      textWrapperElem.className = 'filter__flex';

      const textElems = ['min', 'current', 'max'].map((item) => {
        const textElem = document.createElement('p');
        textElem.className = `filter__range-text filter__range-text_${item} filter__${field.id} filter__${field.id}_${item}`;
        const minText = `${field.range[0].min}${field.id === 'price' ? '$' : ''}`;
        const maxText = `${field.range[0].max}${field.id === 'price' ? '$' : ''}`;
        const currentText = `${minText}-${maxText}`;
        textElem.textContent = item === 'min' ? minText : item === 'max' ? maxText : currentText;

        return textElem;
      });

      if (field.id === 'price') {
        this.priceTextElems = [];
        this.priceTextElems.push(...textElems);
      }

      if (field.id === 'stock') {
        this.stockTextElems = [];
        this.stockTextElems.push(...textElems);
      }

      labelElem.append(...inputElems);
      rangeWrapperElem.append(labelElem);
      textWrapperElem.append(...textElems);
      fieldElem.append(rangeWrapperElem, textWrapperElem);
    } else {
      const labelElem = document.createElement('label');
      labelElem.className = 'filter__select-label';

      const selectElem = document.createElement('select');
      selectElem.className = 'filter__input filter__input_select';
      selectElem.id = field.id;
      selectElem.name = field.id;

      if (field.id === 'category') this.categorySelectElem = selectElem;
      if (field.id === 'brand') this.brandSelectElem = selectElem;

      labelElem.append(selectElem);
      fieldElem.append(labelElem);
    }

    return fieldElem;
  }

  private createFormElem(): HTMLFormElement {
    const formElem = document.createElement('form');
    formElem.className = 'filter__form';

    const titleElem = document.createElement('h3');
    titleElem.className = 'filter__title';
    titleElem.textContent = 'Filters:';

    const fieldsListElem = document.createElement('div');
    fieldsListElem.className = 'filter__fields-list';

    const selectFieldsElems = SELECT_FIELDS.map((field) => this.createSelectFieldElem<FieldSelect>(field));
    const rangeFieldsElems = RANGE_FIELDS.map((field) => this.createSelectFieldElem<FieldRange>(field));

    const copyBtnElem = document.createElement('button');
    copyBtnElem.className = 'filter__btn filter__copy';
    copyBtnElem.type = 'button';
    copyBtnElem.textContent = 'Copy link';

    const resetBtnElem = document.createElement('button');
    resetBtnElem.className = 'filter__reset';
    resetBtnElem.type = 'button';
    resetBtnElem.textContent = 'Reset filters';

    fieldsListElem.append(...selectFieldsElems, ...rangeFieldsElems);
    formElem.append(titleElem, fieldsListElem, copyBtnElem, resetBtnElem);

    this.formElem = formElem;
    this.titleElem = titleElem;
    this.copyBtnElem = copyBtnElem;
    this.resetBtnElem = resetBtnElem;

    return formElem;
  }

  public updateCategories(data: string[], select: string): void {
    if (this.categorySelectElem) {
      this.categorySelectElem.innerHTML = '';

      const categoryItems = ['All categories', ...data].map((item) => {
        const option = document.createElement('option');
        option.textContent = `${item[0].toUpperCase()}${item.slice(1)}`;
        if (item === 'All categories') {
          option.value = 'all';
        } else {
          option.value = item;
        }

        if (item === 'All categories' && select === 'all') {
          option.selected = true;
        }
        if (item === select) {
          option.selected = true;
        }
        return option;
      });

      this.categorySelectElem.append(...categoryItems);
    }
  }

  public updateBrands(data: string[], select: string): void {
    if (this.brandSelectElem) {
      this.brandSelectElem.innerHTML = '';
      const brandsItems = ['All brands', ...data].map((item) => {
        const option = document.createElement('option');
        option.textContent = item;
        if (item === 'All brands') {
          option.value = 'all';
        } else {
          option.value = item;
        }
        if (item === 'All brands' && select === 'all') {
          option.selected = true;
        }
        if (item === select) {
          option.selected = true;
        }
        return option;
      });

      this.brandSelectElem.append(...brandsItems);
    }
  }

  public updatePrice(price: MinMax, priceFilter: MinMax): void {
    const [priceFromSlider, priceToSlider] = this.priceInputElems;
    if (priceFromSlider) {
      priceFromSlider.min = price.min.toString();
      priceFromSlider.max = price.max.toString();
      priceFromSlider.value = priceFilter.min.toString();
    }
    if (priceToSlider) {
      priceToSlider.min = price.min.toString();
      priceToSlider.max = price.max.toString();
      priceToSlider.value = priceFilter.max.toString();
    }
  }

  public updateStock(stock: MinMax, stockFilter: MinMax): void {
    const [stockFromSlider, stockToSlider] = this.stockInputElems;
    if (stockFromSlider) {
      stockFromSlider.min = stock.min.toString();
      stockFromSlider.max = stock.max.toString();
      stockFromSlider.value = stockFilter.min.toString();
    }
    if (stockToSlider) {
      stockToSlider.min = stock.min.toString();
      stockToSlider.max = stock.max.toString();
      stockToSlider.value = stockFilter.max.toString();
    }
  }

  public updatePriceValues(price: MinMax, priceFilter: MinMax): void {
    const [priceMinElem, priceCurrentElem, priceMaxElem] = this.priceTextElems;
    if (priceMinElem) priceMinElem.textContent = `${price.min.toString()}$`;
    if (priceCurrentElem)
      priceCurrentElem.textContent = `${priceFilter.min.toString()}$  -  ${priceFilter.max.toString()}$`;
    if (priceMaxElem) priceMaxElem.textContent = `${price.max.toString()}$`;

    const [priceFromSlider, priceToSlider] = this.priceInputElems;
    if (priceFromSlider) priceFromSlider.value = priceFilter.min.toString();
    if (priceToSlider) priceToSlider.value = priceFilter.max.toString();
  }

  public updateStockValues(stock: MinMax, stockFilter: MinMax): void {
    const [stockMinElem, stockCurrentElem, stockMaxElem] = this.stockTextElems;
    if (stockMinElem) stockMinElem.textContent = stock.min.toString();
    if (stockCurrentElem)
      stockCurrentElem.textContent = `${stockFilter.min.toString()}  -  ${stockFilter.max.toString()}`;
    if (stockMaxElem) stockMaxElem.textContent = stock.max.toString();

    const [stockFromSlider, stockToSlider] = this.stockInputElems;
    if (stockFromSlider) stockFromSlider.value = stockFilter.min.toString();
    if (stockToSlider) stockToSlider.value = stockFilter.max.toString();
  }

  public showFilters(): void {
    this.overlay.drawOverlay();
    this.overlay.overlay?.addEventListener('click', () => this.hideFilters());
    this.wrapperElem?.classList.add('filter_show');
  }

  public hideFilters(): void {
    this.overlay.hideOverlay();
    this.wrapperElem?.classList.remove('filter_show');
  }

  public showCopiedMessage(): void {
    if (this.copyBtnElem) {
      this.copyBtnElem.textContent = 'Copied!';
      this.copyBtnElem.classList.add('pointer-none');
      setTimeout(() => {
        if (this.copyBtnElem) {
          this.copyBtnElem.textContent = 'Copy link';
          this.copyBtnElem.classList.remove('pointer-none');
        }
      }, 1500);
    }
  }
}

export default FilterView;
