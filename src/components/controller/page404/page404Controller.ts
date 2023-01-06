import State from '../../app/state';
import PageController from '../pageController';

class Page404Controller extends PageController {
  constructor(state: State) {
    super(state, 'page404');
  }

  start() {
    console.log('page 404');
  }
}

export default Page404Controller;
