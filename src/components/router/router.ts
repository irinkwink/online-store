import { Routes } from '../../types/types';
import CartPageController from '../controller/cartPage/cartPageController';
import CatalogPageController from '../controller/catalogPage/catalogPageController';
import Page404Controller from '../controller/page404/page404Controller';
import PageController from '../controller/pageController';
import ProductPageController from '../controller/productPage/productPageController';
import TemplatePageController from '../controller/templatePage/templatePageController';

class Router {
  private catalogPage: CatalogPageController;
  private cartPage: CartPageController;
  private productPage: ProductPageController;
  private page404: Page404Controller;
  private routes: Routes;
  private route: PageController;

  constructor(templatePage: TemplatePageController) {
    this.catalogPage = new CatalogPageController(templatePage);
    this.productPage = new ProductPageController(templatePage);
    this.cartPage = new CartPageController(templatePage);
    this.page404 = new Page404Controller(templatePage);
    this.routes = {
      404: this.page404,
      '/': this.catalogPage,
      '/product.html': this.productPage,
      '/cart.html': this.cartPage,
    };
    this.route = this.catalogPage;
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

  // public router(e: Event) {
  //   e.preventDefault();
  //   if (e.target instanceof HTMLLinkElement && e.target.href) {
  //     history.pushState({}, '', e.target.href);
  //     this.handleLocation();
  //   }
  // }

  private handleLocation(): void {
    const fullPath = window.location.pathname;
    // const path = `/${fullPath.split('/')[1]}`;
    this.route = fullPath in this.routes ? this.routes[fullPath as keyof Routes] : this.routes[404];
    this.route.start();
  }
}

export default Router;
