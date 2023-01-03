export class PromoCodes {
  codes: string[];
  appliedCodes?: string[];
  constructor(codes: string[]) {
    this.codes = codes;
  }

  checkEnteredCode(val: string, el: HTMLElement): string[] {
    const isInListCodes = this.codes.includes(val);
    const codesEntered: string[] = this.checkCodesForLS();
    console.log(isInListCodes);
    console.log(codesEntered.indexOf(val));
    if (isInListCodes && codesEntered.indexOf(val) < 0) {
      const appliedCodesBlock = document.createElement('div');
      appliedCodesBlock.className = 'promo-block__applied';
      const addCodeBtn = document.createElement('button');
      addCodeBtn.className = 'promo-block__btn add-btn';
      addCodeBtn.innerHTML = 'Add';
      const promoInfo = document.createElement('span');
      promoInfo.innerHTML = 'EPAM  promo - <b>10%</b>';
      promoInfo.insertAdjacentElement('beforeend', addCodeBtn);
      const promoBlock: HTMLElement | null = document.querySelector('.promo-block');
      if (promoBlock) {
        promoBlock.append(promoInfo);
      }
      el.append(appliedCodesBlock);
      addCodeBtn.addEventListener('click', function () {
        codesEntered.push(val);
        el.removeChild(promoInfo);
        localStorage.setItem('appliedCodes', JSON.stringify(codesEntered));
        const delCodeBtn = document.createElement('button');
        delCodeBtn.className = 'promo-block__btn delete-btn';
        delCodeBtn.innerHTML = 'Delete';
        appliedCodesBlock.insertAdjacentHTML(
          'beforeend',
          `       <h4>Applied Codes: </h4>
              <span>Promo code - ${val} - 10%</span>
          `
        );
        appliedCodesBlock.insertAdjacentElement('beforeend', delCodeBtn);
      });
    } else if (isInListCodes && codesEntered.includes(val)) {
      console.log('уже есть');
    }
    return codesEntered;
  }
  checkCodesForLS(): string[] | [] {
    const codes = localStorage.getItem('appliedCodes');
    let codesEntered: string[];
    if (codes) {
      codesEntered = JSON.parse(codes);
    } else {
      codesEntered = [];
    }
    return codesEntered;
  }
  getPromoPercent(): number {
    let percent = 0;
    const codes = localStorage.getItem('appliedCodes');
    let codesEntered: string[];
    if (codes) {
      codesEntered = JSON.parse(codes);
      if (codesEntered.length === 1) {
        percent = 0.1;
      } else {
        percent = 0.2;
      }
    }
    return percent;
  }
  deleteCode(elems: NodeList) {
    const appliedCodes = this.checkCodesForLS();
    elems.forEach(function (elem) {
      elem.addEventListener('click', function (e: Event) {
        const target = e.currentTarget as HTMLElement;
        console.log(target);
        if (target) {
          console.log(target);
          const ind = Number(target.getAttribute('data-code'));
          appliedCodes.splice(ind, 1);
          localStorage.setItem('appliedCodes', JSON.stringify(appliedCodes));
        }
      });
    });
    console.log(appliedCodes);
  }
  drawPromoApplied() {
    const codes = this.checkCodesForLS();
    console.log(codes.length);
    if (codes.length) {
      const promoBlock: HTMLElement | null = document.querySelector('.promo-block');
      const appliedCodesBlock = document.createElement('div');
      appliedCodesBlock.className = 'promo-block__applied';
      appliedCodesBlock.insertAdjacentHTML('afterbegin', `<h4> Applied Codes</h4>`);

      codes.forEach(function (code) {
        const delCodeBtn = document.createElement('button');
        delCodeBtn.className = 'promo-block__btn delete-btn';
        delCodeBtn.innerHTML = 'Delete';
        delCodeBtn.addEventListener('click', function (e: Event) {
          const target = e.currentTarget as HTMLElement;
          console.log(target);
          if (target) {
            console.log(target);
            const ind = Number(target.getAttribute('data-code'));
            codes.splice(ind, 1);
            localStorage.setItem('appliedCodes', JSON.stringify(codes));
          }
        });

        delCodeBtn.setAttribute('data-code', code);
        appliedCodesBlock.insertAdjacentHTML(
          'beforeend',
          `
 <span>Promo code - ${code} - 10%</span>
`
        );
        appliedCodesBlock.insertAdjacentElement('beforeend', delCodeBtn);
      });
      if (promoBlock) {
        promoBlock.append(appliedCodesBlock);
      }
    }
  }
}

export const myPromoCode = new PromoCodes(['RSS', 'EPAM']);

export default myPromoCode;
