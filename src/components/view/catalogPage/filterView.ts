import { MinMax } from '../../../types/types';
import Overlay from '../overlay/overlay';

class FilterView {
  overlay: Overlay;

  constructor() {
    this.overlay = new Overlay();
  }

  drawSearchInput(value: string) {
    const searchInput = document.querySelector('.search__input');

    if (searchInput instanceof HTMLInputElement) {
      searchInput.value = value;
    }
  }

  drawSortInput(value: string) {
    const sortInputElem = document.querySelector('#sort');

    if (sortInputElem) {
      Array.from(sortInputElem.children).forEach((item) => {
        if ((item as HTMLOptionElement).value === value) {
          (item as HTMLOptionElement).selected = true;
        }
      });
    }
  }

  drawCategories(data: string[], select: string) {
    const categorySelectElem = document.querySelector('#category');
    if (categorySelectElem) {
      categorySelectElem.innerHTML = '';

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

      categorySelectElem.append(...categoryItems);
    }
  }

  drawBrands(data: string[], select: string) {
    const brandSelectElem = document.querySelector('#brand');
    if (brandSelectElem) {
      brandSelectElem.innerHTML = '';
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

      brandSelectElem.append(...brandsItems);
    }
  }

  drawPrice(price: MinMax, priceFilter: MinMax) {
    const priceFromSlider: HTMLInputElement | null = document.querySelector('#priceFromSlider');
    if (priceFromSlider) {
      priceFromSlider.min = price.min.toString();
      priceFromSlider.max = price.max.toString();
      priceFromSlider.value = priceFilter.min.toString();
    }
    const priceToSlider: HTMLInputElement | null = document.querySelector('#priceToSlider');
    if (priceToSlider) {
      priceToSlider.min = price.min.toString();
      priceToSlider.max = price.max.toString();
      priceToSlider.value = priceFilter.max.toString();
    }
  }

  drawStock(stock: MinMax, stockFilter: MinMax) {
    const stockFromSlider: HTMLInputElement | null = document.querySelector('#stockFromSlider');
    if (stockFromSlider) {
      stockFromSlider.min = stock.min.toString();
      stockFromSlider.max = stock.max.toString();
      stockFromSlider.value = stockFilter.min.toString();
    }
    const stockToSlider: HTMLInputElement | null = document.querySelector('#stockToSlider');
    if (stockToSlider) {
      stockToSlider.min = stock.min.toString();
      stockToSlider.max = stock.max.toString();
      stockToSlider.value = stockFilter.max.toString();
    }
  }

  drawPriceValues(price: MinMax, priceFilter: MinMax) {
    const priceMinElem = document.querySelector('.filter__price_min');
    if (priceMinElem) {
      priceMinElem.textContent = `${price.min.toString()}$`;
    }

    const priceCurrentElem = document.querySelector('.filter__price_current');
    if (priceCurrentElem) {
      priceCurrentElem.textContent = `${priceFilter.min.toString()}$  -  ${priceFilter.max.toString()}$`;
    }

    const priceMaxElem = document.querySelector('.filter__price_max');
    if (priceMaxElem) {
      priceMaxElem.textContent = `${price.max.toString()}$`;
    }

    const priceFromSlider: HTMLInputElement | null = document.querySelector('#priceFromSlider');
    if (priceFromSlider) {
      priceFromSlider.value = priceFilter.min.toString();
    }
    const priceToSlider: HTMLInputElement | null = document.querySelector('#priceToSlider');
    if (priceToSlider) {
      priceToSlider.value = priceFilter.max.toString();
    }
  }

  drawStockValues(stock: MinMax, stockFilter: MinMax) {
    const stockMinElem = document.querySelector('.filter__stock_min');
    if (stockMinElem) {
      stockMinElem.textContent = stock.min.toString();
    }

    const stockCurrentElem = document.querySelector('.filter__stock_current');
    if (stockCurrentElem) {
      stockCurrentElem.textContent = `${stockFilter.min.toString()}  -  ${stockFilter.max.toString()}`;
    }

    const stockMaxElem = document.querySelector('.filter__stock_max');
    if (stockMaxElem) {
      stockMaxElem.textContent = stock.max.toString();
    }

    const stockFromSlider: HTMLInputElement | null = document.querySelector('#stockFromSlider');
    if (stockFromSlider) {
      stockFromSlider.value = stockFilter.min.toString();
    }
    const stockToSlider: HTMLInputElement | null = document.querySelector('#stockToSlider');
    if (stockToSlider) {
      stockToSlider.value = stockFilter.max.toString();
    }
  }

  showFilters() {
    this.overlay.showOverlay();
    document.querySelector('.overlay')?.addEventListener('click', () => this.hideFilters());
    document.querySelector('.filter')?.classList.add('filter_show');
  }

  hideFilters() {
    this.overlay.hideOverlay();
    document.querySelector('.filter')?.classList.remove('filter_show');
  }

  showCopiedMessage() {
    const copyBtnElem = document.querySelector('.filter__copy');
    if (copyBtnElem) {
      copyBtnElem.textContent = 'Copied!';
      copyBtnElem.classList.add('pointer-none');
      setTimeout(() => {
        copyBtnElem.textContent = 'Copy link';
        copyBtnElem.classList.remove('pointer-none');
      }, 1500);
    }
  }
}

export default FilterView;
