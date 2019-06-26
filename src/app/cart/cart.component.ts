import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';

import {query} from '@angular/animations';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  itemlist =[];
  finalPrice =0;
  VocherPrice =0;
  subtotal= 0;
  addresses: any[]=[];
  Shipping=0;
  totalPrice=0;
  logIn=JSON.parse(localStorage.getItem('signData')) ;
  id=this.logIn.user.id;

  removeItemFromCart = product => {
    this.storageService.removeFromCart(product);
    $('#finalProduct_').hide();
  }
  constructor(private storageService: StorageService,private itemService: ItemService) {
    storageService.getUserObservable().subscribe({
      next : logIn => {
        this.logIn =JSON.parse(logIn);
        this.id=this.logIn.id;

      }
    });
    itemService.get_address(this.id).subscribe(data=> {
      this.addresses=data;
      console.log(this.addresses);
    });

    if (localStorage.getItem('cart_items') !== null) {
      this.itemlist = JSON.parse(localStorage.getItem('cart_items'));
    }
  }
  checkout() {
    const addressId= $('.option').val();
    const itemIds=  [];
    $('.productCart').each(function() {
      console.log('item id: ', $(this).attr('id'));
      console.log('item id: ', $(this).find('#select').val());
      itemIds.push({
        item_quantity: $(this).find('#select').val(),
        item_id:$(this).attr('id'),
      });
    });
    const time= this.addresses.addresses.preferred_time;
    const checkData = {
      address_id: addressId,
      user_id: this.id,
      items: itemIds,
      preferred_time: time
    };
    this.itemService.makeOrder(checkData).subscribe(data => {
      alert('done');
      console.log(data);
    });
  }
  counter(i: number) {
    return new Array(i);
  }
  ngOnInit() {
    console.log(this.logIn);
    console.log(this.id);
    window.scrollTo(0, 0);
    for (const product of this.itemlist) {
      this.finalPrice += Number(product.price) ;
      this.subtotal =this.finalPrice+this.VocherPrice;
      this.totalPrice= this.subtotal+this.Shipping;
    }
  }

}
