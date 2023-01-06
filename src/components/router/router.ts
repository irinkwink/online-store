import { Controllers, Routes } from '../../types/types';
import PageController from '../controller/pageController';

class Router {
  private routes: Routes;
  private route: PageController;

  constructor([catalogPage, productPage, cartPage, page404]: Controllers) {
    this.routes = {
      404: page404,
      '/': catalogPage,
      '/product': productPage,
      '/cart.html': cartPage,
    };
    this.route = catalogPage;
  }

  public start() {
    this.handleLocation();
    window.addEventListener('popstate', () => this.handleLocation());

    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('a') && target.closest('a')?.target !== '_blank') {
        const link = target.closest('a');
        console.log('target: ', target);
        console.log('link: ', link);
        console.log('link instanceof HTMLLinkElement : ', link instanceof HTMLLinkElement);
        console.log('link.href: ', link?.href);
        if (link?.href && !link.href.includes('cart')) {
          console.log('move');
          e.preventDefault();
          history.pushState({}, '', link.href);
          this.handleLocation();
        }
      }
    });
  }

  public router(e: Event) {
    e.preventDefault();
    if (e.target instanceof HTMLLinkElement && e.target.href) {
      history.pushState({}, '', e.target.href);
      this.handleLocation();
    }
  }

  private handleLocation() {
    const fullPath = window.location.pathname;
    const path = `/${fullPath.split('/')[1]}`;
    console.log('path: ', path);
    this.route = path in this.routes ? this.routes[path as keyof Routes] : this.routes[404];
    this.route.start();
  }
}

export default Router;
