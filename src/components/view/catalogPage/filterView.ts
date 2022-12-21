import { MinMax } from '../../../types/types';
import Overlay from '../overlay/overlay';

class FilterView {
  overlay: Overlay;

  constructor() {
    this.overlay = new Overlay();
  }

  drawCategories(data: string[], select: string) {
    const categorySelectElem = document.querySelector('#category');
    if (categorySelectElem) {
      categorySelectElem.innerHTML = '';

      const categoryItems = ['All categories', ...data].map((item) => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
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
        option.value = item;
        option.textContent = item;
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

  drawPrice({ min, max }: MinMax) {
    const priceMinElem = document.querySelector('.filter__price_min');
    if (priceMinElem) {
      priceMinElem.textContent = `${min.toString()}$`;
    }
    const priceMaxElem = document.querySelector('.filter__price_max');
    if (priceMaxElem) {
      priceMaxElem.textContent = `${max.toString()}$`;
    }
    const priceFromSlider: HTMLInputElement | null = document.querySelector('#priceFromSlider');
    if (priceFromSlider) {
      priceFromSlider.min = min.toString();
      priceFromSlider.max = max.toString();
      priceFromSlider.value = min.toString();
    }
    const priceToSlider: HTMLInputElement | null = document.querySelector('#priceToSlider');
    console.log('priceToSlider: ', priceToSlider);
    if (priceToSlider) {
      priceToSlider.min = min.toString();
      priceToSlider.max = max.toString();
      priceToSlider.value = max.toString();
    }
  }

  drawStock({ min, max }: MinMax) {
    const stockMinElem = document.querySelector('.filter__stock_min');
    if (stockMinElem) {
      stockMinElem.textContent = min.toString();
    }
    const stockMaxElem = document.querySelector('.filter__stock_max');
    if (stockMaxElem) {
      stockMaxElem.textContent = max.toString();
    }
    const stockFromSlider: HTMLInputElement | null = document.querySelector('#stockFromSlider');
    if (stockFromSlider) {
      stockFromSlider.min = min.toString();
      stockFromSlider.max = max.toString();
      stockFromSlider.value = min.toString();
    }
    const stockToSlider: HTMLInputElement | null = document.querySelector('#stockToSlider');
    if (stockToSlider) {
      stockToSlider.min = min.toString();
      stockToSlider.max = max.toString();
      stockToSlider.value = max.toString();
    }

    console.log('stockToSlider: ', stockToSlider);
  }

  drawPriceValues({ min, max }: MinMax) {
    const priceMinElem = document.querySelector('.filter__price_min');
    if (priceMinElem) {
      priceMinElem.textContent = `${min.toString()}$`;
    }
    const priceMaxElem = document.querySelector('.filter__price_max');
    if (priceMaxElem) {
      priceMaxElem.textContent = `${max.toString()}$`;
    }
  }

  drawStockValues({ min, max }: MinMax) {
    const stockMinElem = document.querySelector('.filter__stock_min');
    if (stockMinElem) {
      stockMinElem.textContent = min.toString();
    }
    const stockMaxElem = document.querySelector('.filter__stock_max');
    if (stockMaxElem) {
      stockMaxElem.textContent = max.toString();
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
}

export default FilterView;
