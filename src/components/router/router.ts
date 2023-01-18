import { Routes } from '../../types/types';
import { checkPage, regexProductPage } from '../app/regex';
import CartPageController from '../controller/cartPage/cartPageController';
import CatalogPageController from '../controller/catalogPage/catalogPageController';
import Page404Controller from '../controller/page404/page404Controller';
import ProductPageController from '../controller/productPage/productPageController';
import TemplatePageController from '../controller/templatePage/templatePageController';

class Router {
  private routes: Routes;

  public constructor(templatePage: TemplatePageController) {
    this.routes = {
      '/page404': new Page404Controller(templatePage),
      '/': new CatalogPageController(templatePage),
      '/product': new ProductPageController(templatePage),
      '/cart': new CartPageController(templatePage),
    };
  }

  public start(): void {
    this.handleLocation();

    window.addEventListener('popstate', () => this.handleLocation());

    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('a') && target.closest('a')?.target !== '_blank') {
        const link = target.closest('a');
        if (link?.href) {
          e.preventDefault();
          history.pushState({}, '', link.href);
          this.handleLocation();
        }
      }
    });
  }

  private handleLocation(): void {
    const path = window.location.pathname;

    if (path === '/') {
      this.routes['/'].start();
      return;
    }
    if (path === '/cart') {
      this.routes['/cart'].start();
      return;
    }
    if (checkPage(regexProductPage, path)) {
      this.routes['/product'].start();
      return;
    }

    this.routes['/page404'].start();
    return;
  }
}

export default Router;
