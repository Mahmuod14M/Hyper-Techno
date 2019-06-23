import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  itemlist: any[]=[];
  removeItemFromCart = product => {
    this.storageService.removeFromCart(product);
    $('#finalProduct_').hide();
  }
  constructor(private storageService: StorageService) {

    if (localStorage.getItem('cart_items') !== null) {
      this.itemlist = JSON.parse(localStorage.getItem('cart_items'));
    }
  }

  ngOnInit() {
    console.log(this.itemlist);
  }

}
