import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import swal from 'sweetalert';
declare var $: any;
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  UserDetails: any ;
  orderDetails: any;
  itemId: number;
  review(form) {
    const reviewBody= {
      review:form.value.review,
      user_id: this.UserDetails.user.id,
      rate: 0,
      item_id:this.itemId ,
    };
    this.itemService.add_review(reviewBody).subscribe(data => {
      console.log(data);
      swal('Review Added', '', 'success');
    });
    this.closeReview(this.itemId);
  }
  constructor(private itemService: ItemService, private storageService: StorageService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.UserDetails = this.storageService.getUserData();
    const userID =this.UserDetails.user.id;
    this.itemService.get_user_orders(userID).subscribe( data => {
      this.orderDetails =data;
    });
  }
  showView(id) {
    this.itemId =id;
    $('#review-'+id).show();
  }
  closeReview(id) {
    $('#review-'+id).hide();
  }
}
