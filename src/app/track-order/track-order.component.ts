import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import {ActivatedRoute} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  UserDetails: any ;
  orderDetails: any;
  MyOrders = 'MyOrders';
  MyAddresses = 'MyAddresses';
  MyProfile = 'MyProfile';
  constructor(private itemService: ItemService, private storageService: StorageService, private route: ActivatedRoute) { }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.UserDetails = this.storageService.getUserData();
    const userID =this.UserDetails.user.id;
    this.itemService.get_user_orders(userID).subscribe( data => {
      this.orderDetails =data;
    });
    this.route.paramMap.subscribe(params => {
     const pageName = params.get('pageName');
     if (pageName === this.MyOrders) {
       $('#orderDetailsComponent').show();
       $('#sippingAddressComponent').hide();
       $('#accountSettingComponent').hide();
       $('#myOrders').css('color','#ed2027');
       $('#myAddresses').css('color','#7f7f7f');
       $('#accountSetting').css('color','#7f7f7f');
     } else if (pageName === this.MyAddresses) {
       $('#sippingAddressComponent').show();
       $('#orderDetailsComponent').hide();
       $('#accountSettingComponent').hide();
       $('#myOrders').css('color','#7f7f7f');
       $('#myAddresses').css('color','#ed2027');
       $('#accountSetting').css('color','#7f7f7f');
     } else {
       $('#accountSettingComponent').show();
       $('#sippingAddressComponent').hide();
       $('#orderDetailsComponent').hide();
       $('#myOrders').css('color','#7f7f7f');
       $('#myAddresses').css('color','#7f7f7f');
       $('#accountSetting').css('color','#ed2027');
     }
    });
  }

}
