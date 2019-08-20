import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
declare var $: any;
// @ts-ignore
const Swal = require('sweetalert2');
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {
  UserDetails: any ;
  addressesDetails: [];
  constructor(private itemService: ItemService, private storageService: StorageService) { }
  removeAddress = ID => {
    this.itemService.removeAddress(ID).subscribe(data => {
      console.log('remove', data);
      if (data.error === true) {
        Swal.fire('you can`t remove this Address!', '', 'error');
      } else {
        $('#address'+ID).hide();
        Swal.fire('Address removed!', '', 'success');
      }
    });
  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.UserDetails = this.storageService.getUserData();
    const userID =this.UserDetails.user.id;
    this.itemService.get_address(userID).subscribe( data => {
      this.addressesDetails =data.addresses;
      console.log(data);
    });
  }

}
