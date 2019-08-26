import {Component, OnInit} from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import {Product} from '../Models';
import {Router} from '@angular/router';

declare var $: any;
declare var Checkout: any;
// @ts-ignore
const Swal = require('sweetalert2');


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private storageService: StorageService, private itemService: ItemService, private router: Router) {

  }

  OnlineCheckout: any = Checkout;
  itemlist: any[] = [];
  finalPrice = 0;
  VocherPrice = 0;
  subtotal = 0;
  addresses: any[] = [];
  Shipping = 0;
  totalPrice = 0;
  respons = 0;
  logIn = StorageService.getUserData();
  id = null;

  address: any;

  minus(product) {
    if (1 < product.orderQTY) {
      product.orderQTY -= 1;
      this.finalPrice=0;
      this.cartPrice();
    }
  }

  plus(product) {
    if (product.orderQTY <= product.quantity) {
      product.orderQTY += 1;
      this.finalPrice=0;
      this.cartPrice();
    }
  }

  removeItemFromCart = product => {
    this.storageService.removeFromCart(product);
    // $('#finalProduct_').hide();
    this.finalPrice=0;
    this.cartPrice();
  }

  checkout() {
    if (this.address === 'localShipping') {
      const addressId = $('#LocalDelivery').val();
      const itemIds = [];
      $('.productCart').each(function() {
        itemIds.push({
          item_id: parseInt($(this).attr('id')),
          item_quantity: parseInt($(this).find('.value').val()),

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
        this.respons=data.response;
        Swal.fire('successful!', '', 'success');
        // this.router.navigate(['Account/MyOrders']);
      });
      this.storageService.removeAll();
    } else if (this.address === 'freeShipping') {
      console.log('enterd');
      const addressId = parseInt($('#addressSelector').val());
      const itemIds = [];
      $('.productCart').each(function() {
        itemIds.push({
          item_id: parseInt($(this).attr('id')),
          item_quantity: parseInt($(this).find('.value').val()),
        });
        console.log(this.item_quantity);
      });
      // const time= this.addresses.addresses.preferred_time;
      const checkData = {
        address_id: addressId,
        user_id: this.id,
        items: itemIds,
        // preferred_time: time
      };
      this.itemService.makeOrder(checkData).subscribe(data => {
        if (data.error===true) {
          Swal.fire('error!', '', 'error');
        } else {
          Swal.fire('successful!', '', 'success');
          this.respons=data.response;
          // this.router.navigate(['Account/MyOrders']);
          this.storageService.removeAll();
        }
      });

    }
  }
  OnlinePaymentBtn() {
    this.itemService.OnlinePayment().subscribe( data=> {
      console.log(data);

      Checkout.configure({
        merchant: 'TESTNBETEST',
        session: {
          id:data.session.id // SESSION ID
        },
        order: {
          amount: function() {
            //Dynamic calculation of amount
            return  this.finalPrice;
          },
          currency: 'EGP',
          description: 'Ordered goods',
          id: this.respons
        },

        interaction: {
          operation: 'PURCHASE', // set this field to 'PURCHASE' for Hosted Checkout to perform a Pay Operation.
          merchant: {
            name: 'NBE Test',
            address: {
              line1: '200 Sample St',
              line2: '1234 Example Town'
            }
          }
        }
      });

    });
  }


  counter(i: number) {
    return new Array(i);
  }

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
  cartPrice() {
    this.totalPrice=0;
    this.finalPrice=0;
    this.subtotal=0;

    for (const product of this.itemlist) {
      this.finalPrice +=  Number(product.price *product.orderQTY);
      this.subtotal =this.finalPrice - this.VocherPrice;
      this.totalPrice =this.subtotal+this.Shipping;
      localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
    }
  }

  ngOnInit() {
    this.storageService.getCartObservable().subscribe(data => {
      this.itemlist = data;
      for (const i in this.itemlist) {
        this.itemlist[i].orderQTY = 1;
      }

      // this.totalPrice=0;
      this.cartPrice();
    });
    if (this.logIn == null) {
      Swal.fire('You Have To Login First!', '', 'success');
      this.router.navigate(['home']);
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
      if ( $('input[checked=\'true\']')) {
        const address =$('input[value=\'freeShipping\']').val();
        this.address = address;
      }
    });

    this.storageService.getCartItems();
    window.scrollTo(0, 0);
  }


}
