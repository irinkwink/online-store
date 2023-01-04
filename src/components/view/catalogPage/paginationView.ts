class PaginationView {
  createItemPagination(hrefLink: URL, page: number, active: boolean) {
    const li = document.createElement('li');
    li.className = 'pagination__item';

    const a = document.createElement('a');
    a.className = 'pagination__link';
    a.textContent = page.toString();
    a.href = hrefLink.toString();
    a.dataset.page = page.toString();

    if (active) {
      a.classList.add('pagination__link_active');
    }

    li.append(a);

    return li;
  }

  drawPagination(pages: number, page: number) {
    const paginationWrapper = document.querySelector('.pagination');
    if (paginationWrapper) {
      paginationWrapper.textContent = '';

      const paginationList = document.createElement('ul');
      paginationList.className = 'pagination__list';

      for (let i = 1; i <= pages; i++) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', i.toString());

        const li = this.createItemPagination(url, i, page === i);
        paginationList.append(li);
      }

      const firstItem = document.createElement('a');
      firstItem.classList.add('pagination__arrow', 'arrow');
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

      const firstPageUrl = new URL(window.location.href);
      firstPageUrl.searchParams.set('page', '1');

      firstItem.href = firstPageUrl.toString();

      const lastItem = document.createElement('a');
      lastItem.classList.add('pagination__arrow', 'arrow');
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

      const lastPageUrl = new URL(window.location.href);
      console.log('lastPageUrl: ', lastPageUrl);
      lastPageUrl.searchParams.set('page', pages.toString());
      lastItem.href = lastPageUrl.toString();

      paginationWrapper.append(firstItem, paginationList, lastItem);
    }
  }
}

export default PaginationView;
