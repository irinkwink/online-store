import { Routes } from '../../types/types';
import PageController from '../controller/pageController';

class Router {
  private routes: Routes;
  private route: PageController;

  constructor([catalogPage, productPage, cartPage, page404]: PageController[]) {
    this.routes = {
      404: page404,
      '/': catalogPage,
      '/product.html': productPage,
      '/cart.html': cartPage,
    };
    this.route = catalogPage;
  }

  public start() {
    this.handleLocation();
    window.addEventListener('popstate', () => this.handleLocation());
  }

  public router(e: Event) {
    e.preventDefault();
    if (e.target instanceof HTMLLinkElement && e.target.href) {
      history.pushState({}, '', e.target.href);
      this.handleLocation();
    }
  }

  private handleLocation() {
    const path = window.location.pathname as keyof Routes;
    console.log('path: ', path);
    this.route = path in this.routes ? this.routes[path] : this.routes[404];
    this.route.start();
  }
}

export default Router;
