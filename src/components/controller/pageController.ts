import State from '../app/state';

class PageController {
  state: State;

  constructor(state: State) {
    this.state = state;
  }

  start(): void {
    console.log('start page');
  }
}

export default PageController;
