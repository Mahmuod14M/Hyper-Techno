import {Component, OnInit} from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import {Product} from '../Models';
import {Router} from '@angular/router';

declare var $: any;
import swal from 'sweetalert';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  itemlist: any [] = [];
  amount(item) {
    return item.price;
  }
  sum(prev, next) {
    return prev + next;
  }
  finalPrice = 0;
  VocherPrice = 0;
  subtotal = 0;
  addresses: any[] = [];
  Shipping = 0;
  totalPrice = 0;
  logIn = StorageService.getUserData();
  id = null;
  itemQTY = 1;


  minus(product) {
    if (1 < product.orderQTY) {
      product.orderQTY -= 1;
    }
  }

  plus(product) {
    if (product.orderQTY <= product.quantity) {
      product.orderQTY += 1;
    }
  }

  removeItemFromCart = product => {
    this.storageService.removeFromCart(product);
    $('#finalProduct_').hide();
  };

  constructor(private storageService: StorageService, private itemService: ItemService, private router: Router) {

  }

  checkout() {
    if (this.address === 'localShipping') {
      const addressId = $('#LocalDelivery').val();
      const itemIds = [];
      $('.productCart').each(function() {
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
        swal('successful!', '', 'success');
        this.router.navigate(['Account/MyOrders']);
      });
      this.storageService.removeAll();
    } else if (this.address === 'freeShipping') {
      const addressId = parseInt($('#addressSelector').val());
      const itemIds = [];
      $('.productCart').each(function() {
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
        swal('successful!', '', 'success');
        this.router.navigate(['Account/MyOrders']);
      });
      this.storageService.removeAll();
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  address: any;

  onItemChange(value) {
    const target = value.target.value;
    this.address = value.target.value;
    if (target === 'localShipping') {
      $('#addressSelector').hide();
      $('#LocalDelivery').show();
    } else if (target === 'freeShipping') {
      $('#addressSelector').show();
      $('#LocalDelivery').hide();
    }

  }

  ngOnInit() {
    if (this.logIn == null) {
      swal('You Have To Login First!', '', 'success');
      this.router.navigate(['siginUp']);
    } else {
      this.id = this.logIn.user.id;
    }
    this.storageService.getUserObservable().subscribe({
      next: logIn => {
        this.logIn = JSON.parse(logIn);
        this.id = this.logIn.id;

      }
    });
    this.itemService.get_address(this.id).subscribe(data => {
      this.addresses = data;

    });
    this.storageService.getCartObservable().subscribe(data => {
      this.itemlist = data;
      for (const i in this.itemlist) {
        this.itemlist[i].orderQTY = 1;
      }
      // for (const product of this.itemlist) {
      //   var productPrice = 0;
      //   productsPrice += Number(product.price *product.orderQTY);
      //   this.finalPrice = productsPrice - Voucher
      // }
    });
    this.storageService.getCartItems();
    window.scrollTo(0, 0);
  }


}
