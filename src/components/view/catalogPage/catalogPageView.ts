import { SORT_OPTIONS } from '../../app/const';

class CatalogPageView {
  private wrapperElem: HTMLElement | null;
  private productsCountElem: HTMLSpanElement | null;
  private productsElem: HTMLDivElement | null;
  private displayBtnsElem: HTMLDivElement | null;
  private displayBtnElems: HTMLButtonElement[];
  private paginationElem: HTMLDivElement | null;
  private filterBtnElem: HTMLButtonElement | null;
  private filterElem: HTMLElement | null;
  private sortSelectElem: HTMLSelectElement | null;

  public constructor() {
    this.wrapperElem = null;
    this.productsCountElem = null;
    this.productsElem = null;
    this.displayBtnsElem = null;
    this.displayBtnElems = [];
    this.paginationElem = null;
    this.filterBtnElem = null;
    this.filterElem = null;
    this.sortSelectElem = null;
  }

  public set wrapper(element: HTMLElement | null) {
    this.wrapperElem = element;
  }

  public get productsCount(): HTMLSpanElement | null {
    return this.productsCountElem;
  }

  public get productsWrapper(): HTMLDivElement | null {
    return this.productsElem;
  }

  public get displayBtns(): HTMLDivElement | null {
    return this.displayBtnsElem;
  }

  public get pagination(): HTMLDivElement | null {
    return this.paginationElem;
  }

  public get filterBtn(): HTMLButtonElement | null {
    return this.filterBtnElem;
  }

  public get filter(): HTMLElement | null {
    return this.filterElem;
  }

  public get sortSelect(): HTMLSelectElement | null {
    return this.sortSelectElem;
  }

  public draw(): void {
    if (this.wrapperElem) {
      this.wrapperElem.innerHTML = '';
      this.wrapperElem.append(this.createCatalogElem());
    }
  }

  private createCatalogElem(): HTMLElement {
    const sectionElem = document.createElement('section');
    sectionElem.className = 'catalog';

    const containerElem = document.createElement('div');
    containerElem.className = 'container catalog__container';

    const catalogElem = document.createElement('div');
    catalogElem.className = 'catalog__wrapper';

    const panelTopElem = document.createElement('div');
    panelTopElem.className = 'catalog__panel catalog__panel_top';

    const titleElem = document.createElement('h2');
    titleElem.className = 'catalog__title';
    titleElem.textContent = 'Catalog';

    const itemsNumberElem = document.createElement('p');
    itemsNumberElem.className = 'catalog__items-number';

    const itemsTextElem = document.createElement('span');
    itemsTextElem.className = 'catalog__items-text';
    itemsTextElem.textContent = 'Found: ';

    const itemsCountElem = document.createElement('span');
    itemsCountElem.className = 'catalog__items-count';
    itemsCountElem.textContent = '100';

    const panelBottomElem = document.createElement('div');
    panelBottomElem.className = 'catalog__panel catalog__panel_bottom';

    const panelBottomRightElem = document.createElement('div');
    panelBottomRightElem.className = 'catalog__panel-wrapper';

    const selectLabelElem = document.createElement('label');
    selectLabelElem.className = 'catalog__select-label';

    const selectInputElem = document.createElement('select');
    selectInputElem.className = 'catalog__input catalog__input_select';
    selectInputElem.id = 'sort';
    selectInputElem.name = 'sort';

    const paginationElem = document.createElement('div');
    paginationElem.className = 'catalog__pagination pagination';

    const optionsSortElems = SORT_OPTIONS.map((option) => {
      const optionElem = document.createElement('option');
      optionElem.value = option.value;
      optionElem.textContent = option.text;
      optionElem.selected = option.value === 'none';
      return optionElem;
    });

    const displaylElem = document.createElement('div');
    displaylElem.className = 'catalog__display display';

    const displayBtnTileslElem = document.createElement('button');
    displayBtnTileslElem.className = 'display__button display__button_tiles display__button_active';
    displayBtnTileslElem.dataset.display = 'tiles';
    displayBtnTileslElem.ariaLabel = 'display: tiles';
    displayBtnTileslElem.innerHTML = `
      <svg width="36" height="36" viewbox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="16" height="16" rx="2"/>
        <rect x="19" y="1" width="16" height="16" rx="2"/>
        <rect x="1" y="19" width="16" height="16" rx="2"/>
        <rect x="19" y="19" width="16" height="16" rx="2"/>
      </svg>    
    `;

    const displayBtnRowslElem = document.createElement('button');
    displayBtnRowslElem.className = 'display__button display__button_rows';
    displayBtnRowslElem.dataset.display = 'rows';
    displayBtnRowslElem.ariaLabel = 'display: rows';
    displayBtnRowslElem.innerHTML = `
      <svg width="36" height="36" viewbox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="34" height="7" rx="2"/>
        <rect x="1" y="10" width="34" height="7" rx="2"/>
        <rect x="1" y="19" width="34" height="7" rx="2"/>
        <rect x="1" y="28" width="34" height="7" rx="2"/>
      </svg>
    `;

    const goodsElem = document.createElement('div');
    goodsElem.className = 'catalog__goods goods';

    const filterBtnElem = document.createElement('button');
    filterBtnElem.className = 'catalog__filter-btn';
    filterBtnElem.textContent = 'Filters:';
    const filterElem = document.createElement('aside');
    filterElem.className = 'catalog__filter filter';

    displaylElem.append(displayBtnTileslElem, displayBtnRowslElem);

    selectInputElem.append(...optionsSortElems);
    selectLabelElem.append(selectInputElem);
    panelBottomRightElem.append(selectLabelElem, displaylElem);
    panelBottomElem.append(paginationElem, panelBottomRightElem);

    itemsNumberElem.append(itemsTextElem, itemsCountElem);
    panelTopElem.append(titleElem, itemsNumberElem);
    catalogElem.append(panelTopElem, panelBottomElem, goodsElem, filterBtnElem);
    containerElem.append(catalogElem, filterElem);
    sectionElem.append(containerElem);

    this.productsCountElem = itemsCountElem;
    this.productsElem = goodsElem;
    this.displayBtnsElem = displaylElem;
    this.displayBtnElems = [displayBtnTileslElem, displayBtnRowslElem];
    this.paginationElem = paginationElem;
    this.filterBtnElem = filterBtnElem;
    this.filterElem = filterElem;
    this.sortSelectElem = selectInputElem;

    return sectionElem;
  }

  public updateCount(count: number): void {
    if (this.productsCountElem) {
      this.productsCountElem.textContent = count.toString();
    }
  }

  public updateDisplayBtns(displayType: string): void {
    this.displayBtnElems.forEach((btn) => {
      btn.classList.remove('display__button_active');
      if (displayType === btn.dataset.display) {
        btn.classList.add('display__button_active');
      }
    });
  }

  public updateSortInput(value: string): void {
    if (this.sortSelectElem) {
      Array.from(this.sortSelectElem.children).forEach((item) => {
        if ((item as HTMLOptionElement).value === value) {
          (item as HTMLOptionElement).selected = true;
        }
      });
    }
  }
}

export default CatalogPageView;
