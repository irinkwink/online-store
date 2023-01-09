import FooterView from '../../view/templatePage/footerView';

class FooterController {
  public view: FooterView;

  public constructor() {
    this.view = new FooterView();
  }

  public init(): void {
    this.view.draw();
  }
}

export default FooterController;
