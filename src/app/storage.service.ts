import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
declare var $: any;

@Injectable()
export class StorageService {
  constructor() { }
  private static instant: StorageService = null;
  private cart = new Subject<any>();
  cartList: any[]=[];
  idList: any[] = [];
  getCartObservable() {
    return this.cart.asObservable();
  }
  addToCart(product) {
    const self = this;
    if (localStorage.getItem('cart_items') !== null) {
      self.cartList = JSON.parse(localStorage.getItem('cart_items'));
    }

    for (const item of self.cartList) {
      const id = item.id;
      self.idList.push(id);

    }
    const idFound = self.idList.includes(product.id);

    if (idFound === false) {

      self.cartList.push(product);
      localStorage.setItem('cart_items', JSON.stringify(self.cartList));


    }
    this.cart.next(this.cartList);
  }
  removeFromCart(product) {
    const itemsArry = JSON.parse(localStorage.getItem('cart_items'));

    for (let index = 0; index < itemsArry.length; index++) {

      if (itemsArry[index].id === product) {

        itemsArry.splice(index, 1);
        localStorage.setItem('cart_items', JSON.stringify(itemsArry));
        $('#cart_item_' + product).fadeOut();
      }

    }
    this.cart.next(itemsArry);
  }
}
