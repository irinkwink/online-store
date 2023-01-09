class PaginationView {
  private wrapperElem: HTMLDivElement | null;
  private pageNumberElems: HTMLButtonElement[] | null;
  private lastArrowElem: HTMLButtonElement | null;
  private firstArrowElem: HTMLButtonElement | null;

  public constructor() {
    this.wrapperElem = null;
    this.pageNumberElems = null;
    this.lastArrowElem = null;
    this.firstArrowElem = null;
  }

  public get pagination(): HTMLDivElement | null {
    return this.wrapperElem;
  }

  public set wrapper(element: HTMLDivElement | null) {
    this.wrapperElem = element;
  }

  private createItemPagination(page: number, active: boolean): HTMLButtonElement {
    const btnElem = document.createElement('button');
    btnElem.className = 'btn pagination__btn pagination__btn_number';
    btnElem.textContent = page.toString();
    btnElem.dataset.page = page.toString();

    if (active) {
      btnElem.classList.add('pagination__btn_active');
    }

    return btnElem;
  }

  public draw(pages: number, page: number): void {
    if (this.wrapperElem) {
      this.wrapperElem.textContent = '';

      if (pages > 1) {
        const paginationList = document.createElement('div');
        paginationList.className = 'pagination__list';

        const pageNumberElems = new Array(pages)
          .fill(0)
          .map((_, index) => index + 1)
          .map((number) => this.createItemPagination(number, page === number));

        paginationList.append(...pageNumberElems);

        const firstItem = document.createElement('button');
        firstItem.className = 'btn pagination__btn pagination__btn_arrow arrow';
        firstItem.ariaLabel = 'go to the first page';
        firstItem.dataset.page = '1';
        firstItem.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.0918 3.49205L7.5958 9.00005L13.0918 14.508L11.3998 16.2L4.1998 9.00005L11.3998 1.80005L13.0918 3.49205Z"/>
          </svg>
        `;

        if (page === 1) {
          firstItem.classList.add('inactive');
        }

        const lastItem = document.createElement('button');
        lastItem.className = 'btn pagination__btn pagination__btn_arrow arrow';
        lastItem.ariaLabel = 'go to the last page';
        lastItem.dataset.page = pages.toString();
        lastItem.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.9082 3.49205L10.4042 9.00005L4.9082 14.508L6.6002 16.2L13.8002 9.00005L6.6002 1.80005L4.9082 3.49205Z"/>
          </svg>
        `;

        if (page === pages) {
          lastItem.classList.add('inactive');
        }

        this.wrapperElem.append(firstItem, paginationList, lastItem);
        this.pageNumberElems = pageNumberElems;
        this.lastArrowElem = lastItem;
        this.firstArrowElem = firstItem;
      }
    }
  }

  public updateArrows(pages: number, page: number): void {
    if (this.firstArrowElem) {
      if (page === 1) {
        this.firstArrowElem.classList.add('inactive');
      } else {
        this.firstArrowElem.classList.remove('inactive');
      }
    }

    if (this.lastArrowElem) {
      if (page === pages) {
        this.lastArrowElem.classList.add('inactive');
      } else {
        this.lastArrowElem.classList.remove('inactive');
      }
    }
  }

  public updatePageButtons(page: number): void {
    this.pageNumberElems?.forEach((btn) => {
      const btnNumber = btn.dataset.page;
      if (btnNumber) {
        if (+btnNumber === page) {
          btn.classList.add('pagination__btn_active');
        } else {
          btn.classList.remove('pagination__btn_active');
        }
      }
    });
  }
}

export default PaginationView;
