import {Component, OnInit} from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';

import {query} from '@angular/animations';
import {Product} from '../Models';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {



  itemlist: Product[];
  finalPrice = 0;
  VocherPrice = 0;
  subtotal = 0;
  addresses: any[] = [];
  Shipping = 0;
  totalPrice = 0;
  logIn = StorageService.getUserData();
  id = this.logIn.user.id;

  removeItemFromCart = product => {
    this.storageService.removeFromCart(product);
    $('#finalProduct_').hide();
  }

  constructor(private storageService: StorageService, private itemService: ItemService) {
    storageService.getUserObservable().subscribe({
      next: logIn => {
        this.logIn = JSON.parse(logIn);
        this.id = this.logIn.id;

      }
    });
    itemService.get_address(this.id).subscribe(data => {
      this.addresses = data;

    });
  }

  checkout() {
    const addressId = parseInt($('#addressSelector').val());
    const itemIds = [];
    $('.productCart').each(function() {
      console.log('item id: ', $(this).attr('id'));
      console.log('item id: ', $(this).find('#select').val());
      itemIds.push({
        item_id: parseInt($(this).attr('id')),
        item_quantity: parseInt($(this).find('#select').val()),
      });
    });
    // const time= this.addresses.addresses.preferred_time;
    const checkData = {
      address_id: addressId,
      user_id: this.id,
      items: itemIds,
      // preferred_time: time
    };
    this.itemService.makeOrder(checkData).subscribe(data => {
      console.log(checkData);

    });
    this.storageService.removeAll();
  }

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit() {
    function errorCallback(error) {
      console.log(JSON.stringify(error));
    }
    function cancelCallback() {
      console.log('Payment cancelled');
    }

    console.log(this.logIn);
    console.log(this.id);
    this.storageService.getCartItems();
    this.storageService.getCartObservable().subscribe(data => {
      this.itemlist = data;

      for (const product of this.itemlist) {
        this.finalPrice += Number(product.price);
        this.subtotal = this.finalPrice + this.VocherPrice;
        this.totalPrice = this.subtotal + this.Shipping;
      }
    });
    window.scrollTo(0, 0);
  }


}
