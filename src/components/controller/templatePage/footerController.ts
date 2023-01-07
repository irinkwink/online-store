import FooterView from '../../view/templatePage/footerView';

class FooterController {
  public view: FooterView;

  constructor() {
    this.view = new FooterView();
  }

  public init() {
    this.view.draw();
  }
}

export default FooterController;
