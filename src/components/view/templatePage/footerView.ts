import { DEVELOPERS } from '../../app/const';
import logo from '../../../img/logo.svg';

class FooterView {
  private footerElem: HTMLElement | null;

  constructor() {
    this.footerElem = null;
  }

  public get footer(): HTMLElement | null {
    return this.footerElem;
  }

  public draw(): void {
    this.footerElem = document.createElement('footer');
    this.footerElem.className = 'footer';

    this.footerElem.append(...this.createFooterElems());
  }

  private createFooterElems(): HTMLElement[] {
    const titleElem = document.createElement('h2');
    titleElem.className = 'visually-hidden';
    titleElem.textContent = 'Online Store Copyright and Contacts';

    const containerElem = document.createElement('div');
    containerElem.className = 'container footer__container';

    const logoLinkElem = document.createElement('a');
    logoLinkElem.className = 'footer__logo-link';
    logoLinkElem.href = '/';

    const logoElem = new Image();
    logoElem.className = 'footer__logo';
    logoElem.src = logo;
    logoElem.alt = 'logo Online Store';

    const copyrightElem = document.createElement('div');
    copyrightElem.className = 'footer__column footer__copyright copyright';

    const copyrightTextElem = document.createElement('p');
    copyrightTextElem.className = 'copyright__text';
    copyrightTextElem.textContent = '© ONLine Store, 2022';

    const contactsElem = document.createElement('div');
    contactsElem.className = 'footer__column footer__contacts contacts';

    const contactsTitleElem = document.createElement('p');
    contactsTitleElem.className = 'contacts__title';
    contactsTitleElem.textContent = 'Developers:';

    const developerElems = DEVELOPERS.map((person) => {
      const personElem = document.createElement('p');
      personElem.className = 'contacts__person';
      personElem.textContent = person.name;

      const linkElem = document.createElement('a');
      linkElem.className = 'contacts__link';
      linkElem.href = person.githubUrl;
      linkElem.target = '_blank';
      linkElem.textContent = person.githubName;

      personElem.append(linkElem);

      return personElem;
    });

    logoLinkElem.append(logoElem);
    copyrightElem.append(copyrightTextElem);
    contactsElem.append(titleElem, ...developerElems);

    containerElem.append(logoLinkElem, copyrightElem, contactsElem);

    return [titleElem, containerElem];
  }
}

export default FooterView;
