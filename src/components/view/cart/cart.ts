import { IProduct, IProductsData } from '../../../types/interfaces';

export class Cart {
  products?: IProduct[];

  constructor() {
    this.products = [];
  }

  identityProducts(arr: number[], data: IProductsData): IProduct[] {
    const pickedProducts = [];
    for (let i = 0; i < arr.length; i++) {
      const products = data.products;
      console.log(products);
      const fined = products.filter((item) => item.id == arr[i]);
      if (fined.length > 0) {
        pickedProducts.push(...fined);
      }
    }
    console.log(pickedProducts);
    return pickedProducts;
  }
  render(productsInCart: IProduct[]) {
    const cartTable = document.querySelector('.cart-table');
    productsInCart.forEach(
      (product) =>
        function () {
          cartTable?.insertAdjacentHTML(
            'afterbegin',
            `
                    <tr>
                        <td>+</td>
                        <td>${product.images}</td>
                        <td>${product.title}</td>
                        <td>${product.price}</td>
                    </tr>
                `
          );
        }
    );
  }
}

export default Cart;
