import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ItemService} from './item.service';

declare var $: any;

@Injectable()
export class StorageService {
  constructor(private itemService: ItemService) {
  }

  private cart = new Subject<any>();
  public userData = JSON.parse(localStorage.getItem('signData'));
  private log = new Subject<any>();

  static getUserData() {
    return JSON.parse(localStorage.getItem('signData'));
  }

  getUserObservable() {
    return this.log.asObservable();
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

  // CART
  addToCart(product) {
    if (localStorage) {
      let cart = [];
      if (localStorage.cartID) {
        cart = JSON.parse(localStorage.cartID);
      }
      if (!cart.includes(product.id)) {
        cart.push(product.id);
      }
      localStorage.cartID = JSON.stringify(cart);
      this.getCartItems(cart);
    }
  }

  removeFromCart(product) {
    const itemsArry = JSON.parse(localStorage.cartID);
    for (let index = 0; index < itemsArry.length; index++) {
      if (itemsArry[index].id === product.id) {
        itemsArry.splice(index, 1);
        localStorage.cartID = JSON.stringify(itemsArry);
        $('#cart_item_' + product).fadeOut();
      }
    }
    this.getCartItems(itemsArry);
  }

  getCartObservable() {
    return this.cart.asObservable();
  }

  getCartItems(ids = null) {
    if (!ids) {
      ids = JSON.parse(localStorage.cartID);
    }
    return this.itemService.getBroductById({ids}).subscribe(data => {
      console.log('Response :', data);
      if (!data.error) {
        this.cart.next(data.products);
      } else {
        return [];
      }
    });
  }
}
