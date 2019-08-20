
import {Component, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../storage.service';
declare var $: any;
// @ts-ignore
const Swal = require('sweetalert2');

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private itemService: ItemService, private route: ActivatedRoute, private storageService: StorageService ) {}
  items: any[] = [];
  itemListIDS: any[] = [];
  wishListIDS: any[] = [];
  pageTitle= 'OUR PRODUCTS';
  addToCart = function(product) {
    this.storageService.addToCart(product);
  };
  addToWishList = function(product) {
    this.storageService.addTOWishList(product);
  };
  removeToWishList = function(id) {
    this.storageService.removeToWishList(id);
  };
  ngOnInit() {
    this.storageService.getCartItems();
    this.storageService.getwishListItems();
    this.storageService.getCartObservable().subscribe(data => {
      for (const product of data) {
        this.itemListIDS.push(product.id);
      }
    });
    this.storageService.getwishListObservable().subscribe(data => {
      this.items=data;
      for (const product of data) {
        this.wishListIDS.push(product.id);
      }
    });
    window.scrollTo(0, 0);
  }
}
