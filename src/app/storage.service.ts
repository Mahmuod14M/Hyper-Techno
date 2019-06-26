import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ItemService} from './item.service';

declare var $: any;

@Injectable()
export class StorageService {
  constructor(private itemService: ItemService) {
  }

  private static instant: StorageService = null;
  private cart = new Subject<any>();
  cartList: any[] = [];
  idList: any[] = [];
  public userData = JSON.parse(localStorage.getItem('signData'));w
  private log = new Subject<any>();

  getUserData() {
    return localStorage.getItem('signData');
  }

  getUserObservable() {
    return this.log.asObservable();
  }

  getCartObservable() {
    return this.cart.asObservable();
  }

  register(form) {
    const signUpData = {
      email: form.value.Umail,
      last_name: form.value.Lname,
      first_name: form.value.Fname,
      password: form.value.password,
    };
    this.itemService.signUp(signUpData).subscribe(data => {
      localStorage.setItem('signData', JSON.stringify(data));
      this.userData = localStorage.getItem('signData');
      this.log.next(this.userData);
    });
  }

  address(form) {
    const user = JSON.parse(localStorage.getItem('signData'));
    if (user) {
      const AddAddress = {
        area_name: form.value.City,
        location_type: form.value.LocationType,
        apartment_num: form.value.ApartmentNum,
        floor_num: form.value.FloorNumber,
        user_id: user.user.id,
        street_name: form.value.Street,
        first_name: form.value.Fname,
        mobile: form.value.MobileNumber,
        latitude: 0,
        preferred_time: form.value.PreferredDeliveryTime,
        landline: form.value.LandlineNumber,
        landmark: form.value.NearstLandmark,
        longitude: 0,
        city_name: form.value.City,
        last_name: form.value.Lname,
        notes: form.value.Notes,
        building_num: form.value.buildNum,
        country_name: form.value.country
      };
      this.itemService.address(AddAddress).subscribe(data => {
        localStorage.setItem('UserAddress', JSON.stringify(data));
        console.log(data);
        console.log(user.user.id);
      });
    }
  }

  logIN(form) {
    const signInData = {
      email: form.value.email,
      password: form.value.password,
    };
    this.itemService.signIn(signInData).subscribe(data => {
      localStorage.setItem('signData', JSON.stringify(data));
      this.userData = localStorage.getItem('signData');
      this.log.next(this.userData);
    });
  }

  removeId() {
    localStorage.removeItem('signData');
    this.userData = localStorage.getItem('signData');
    this.log.next(this.userData);
  }
  addToCart(product) {
    const self = this;
    if (localStorage.getItem('cart_items') !== null) {
      self.cartList = JSON.parse(localStorage.getItem('cart_items'));
    }

    for (const item of self.cartList) {
      self.idList.push(item.id);
    }
    console.log('self.idList',self.idList);
    console.log('product.id',product.id);
    const idFound = self.idList.includes(product.id);

    if (!idFound) {
      self.cartList.push(product);
      console.log('product', product);
      localStorage.setItem('cart_items', JSON.stringify(self.cartList));
    }
    this.cart.next(this.cartList);
  }

  removeFromCart(product) {
    const itemsArry = JSON.parse(localStorage.getItem('cart_items'));

    for (let index = 0; index < itemsArry.length; index++) {

      if (itemsArry[index].id === product) {

        itemsArry.splice(index, 1);
        localStorage.setItem('cart_items', JSON.stringify(itemsArry));
        $('#cart_item_' + product).fadeOut();
      }

    }
    this.cart.next(itemsArry);
  }
}
