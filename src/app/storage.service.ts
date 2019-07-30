import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ItemService} from './item.service';

declare var $: any;

@Injectable()
export class StorageService {
  constructor(private itemService: ItemService) {
  }

  private cart = new Subject<any>();
  // public cartIDS=   JSON.parse(localStorage.cartID);
  public userData = JSON.parse(localStorage.getItem('signData'));
  private log = new Subject<any>();

  static getUserData() {
    return JSON.parse(localStorage.getItem('signData'));
  }

  getUserData() {
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

  address(id, form) {
    const user = JSON.parse(localStorage.getItem('signData'));
    if (user) {
      for (const key in form.value) {
        const value = form.value[key];
        if (value === '') {
          form.value[key] = null;
        }
      }
      const AddAddress = {
        address_id: id,
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
      });
    }
  }

  logIN(form) {
    const filter = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const password = form.value.password;
    const passwordValidator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    const emailValidator = form.value.email;
    if (filter.test(emailValidator)) {
      const signInData = {
        email: form.value.email,
        password: form.value.password,
      };
      this.itemService.signIn(signInData).subscribe(data => {
        localStorage.setItem('signData', JSON.stringify(data));
        this.userData = localStorage.getItem('signData');
        this.log.next(this.userData);
        alert('Login successful!');
      });
    } else {
      alert('Your mail is wrong');
    }
  }

  removeId() {
    localStorage.removeItem('signData');
    this.userData = localStorage.getItem('signData');
    this.log.next(this.userData);
    alert('logOut successful!');
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
      this.getCartItems();
    }
  }

  removeAll() {
    localStorage.cartID = [];
    this.cart.next([]);
  }

  removeFromCart(productID) {
    const itemsArray = JSON.parse(localStorage.cartID);
    for (let index = 0; index < itemsArray.length; index++) {
      if (itemsArray[index] === productID) {
        itemsArray.splice(index, 1);
        localStorage.cartID = JSON.stringify(itemsArray);
        $('#cart_item_' + productID).fadeOut();
      }
    }
    this.getCartItems();
  }

  getCartObservable() {
    return this.cart.asObservable();
  }

  getCartItems() {
    if (localStorage.cartID) {
      const ids = JSON.parse(localStorage.cartID);
      this.itemService.getBroductById({ids}).subscribe(data => {
        if (!data.error) {
          this.cart.next(data.products);
        } else {
          this.cart.next([]);
        }
      });
    } else {
      this.cart.next([]);
    }
  }
}
