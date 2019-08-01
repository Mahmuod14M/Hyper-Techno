import {Component, OnInit} from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import {Product} from '../Models';
import {Router} from '@angular/router';

declare var $: any;
import swal from 'sweetalert';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
  id = null;
  itemQTY = 1;

  minus(QTY,id) {
    const number =$('#itemNum'+id).attr('value',this.itemQTY);
    this.itemQTY -= number;
    $('#itemNum'+id).attr('value',this.itemQTY);
}
  plus(QTY,id) {
    const number =$('#itemNum'+id).val();
    this.itemQTY += number;
    $('#itemNum'+id).attr('value',this.itemQTY);
  }

  removeItemFromCart = product => {
    this.storageService.removeFromCart(product);
    $('#finalProduct_').hide();
  };

  constructor(private storageService: StorageService, private itemService: ItemService, private router: Router) {

  }

  checkout() {
    if (this.address==='localShipping') {
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
    } else if (this.address==='freeShipping') {
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
   address : any;
  onItemChange(value) {
    const target =value.target.value;
    this.address =value.target.value;
    if (target==='localShipping') {
      $('#addressSelector').hide();
      $('#LocalDelivery').show();
    } else if (target==='freeShipping') {
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
