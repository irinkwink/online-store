class Filter {
  init() {
    const filterFormElem = document.querySelector('.filter__form');

    if (filterFormElem) {
      filterFormElem.addEventListener('submit', (e) => this.submit(e));
    }
  }

  submit(e: Event) {
    e.preventDefault();
    console.log(this);
  }
}

export default Filter;
