import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ItemService} from './item.service';
import {Router} from '@angular/router';
// @ts-ignore
const Swal = require('sweetalert2');
declare var $: any;

@Injectable()
export class StorageService {
  constructor(private itemService: ItemService, private router: Router) {
  }

  private cart = new Subject<any>();
  private wishList = new Subject<any>();
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
    const filter = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const nameFilter = /^[a-zA-Z]{3,9}/;
    const emailValidator = form.value.Umail;
    const LnameValidator = form.value.Lname;
    const FnameValidator = form.value.Fname;
    if (filter.test(emailValidator) && nameFilter.test(LnameValidator) && nameFilter.test(FnameValidator)) {
      const signUpData = {
        email: form.value.Umail,
        last_name: form.value.Lname,
        first_name: form.value.Fname,
        password: form.value.password,
      };
      if (form.value.Umail === '' || form.value.Lname === '' || form.value.Fname === '' || form.value.password === '') {
        Swal.fire('you have to complete fields', '', 'error');
      } else {
        this.itemService.signUp(signUpData).subscribe(data => {
          if (data.message === 'Email Already Exists') {
            Swal.fire('Email Already Exists', '', 'error');
          } else {
            localStorage.setItem('signData', JSON.stringify(data));
            this.userData = localStorage.getItem('signData');
            this.log.next(this.userData);
            this.router.navigate(['home']);
          }
        });
      }
    } else if (!filter.test(emailValidator)) {
      Swal.fire('Your mail is wrong!', '', 'error');
    } else if (!nameFilter.test(LnameValidator)) {
      Swal.fire('Your Last Name is wrong!', '', 'error');
    } else if (!nameFilter.test(FnameValidator)) {
      Swal.fire('Your First Name is wrong!', '', 'error');
    }
  }
  EditUserProfile(id,form) {
    const filter = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const nameFilter = /^[a-zA-Z]{3,9}/;
    const emailValidator = form.value.Umail;
    const LnameValidator = form.value.Lname;
    const FnameValidator = form.value.Fname;
    if (filter.test(emailValidator) && nameFilter.test(LnameValidator) && nameFilter.test(FnameValidator)) {
      const signUpData = {
        email: form.value.Umail,
        last_name: form.value.Lname,
        first_name: form.value.Fname,
        password: form.value.password,
        user_id:id,
        old_password:form.value.oldPassword
      };
      if (form.value.Umail === '' || form.value.Lname === '' || form.value.Fname === '' || form.value.password === ''||
        form.value.password==='') {
        Swal.fire('you have to complete fields', '', 'error');
      } else {
        this.itemService.EditUserProfile(signUpData).subscribe(data => {
          if (data.message === 'wrong old password') {
            Swal.fire('wrong old password', '', 'error');
          } else {
            localStorage.setItem('signData', JSON.stringify(data));
            this.userData = localStorage.getItem('signData');
            this.log.next(this.userData);
            this.router.navigate(['home']);
          }
        });
      }
    } else if (!filter.test(emailValidator)) {
      Swal.fire('Your mail is wrong!', '', 'error');
    } else if (!nameFilter.test(LnameValidator)) {
      Swal.fire('Your Last Name is wrong!', '', 'error');
    } else if (!nameFilter.test(FnameValidator)) {
      Swal.fire('Your First Name is wrong!', '', 'error');
    }
  }

  address(id, form) {
    const filter = /^[a-zA-Z0-9]{3,9}/;
    const num = /^[0-9]{3,9}/;
    const LnameValidator = form.value.Lname;
    const CityValidator = form.value.City;
    const FnameValidator = form.value.Fname;
    const StreetValidator = form.value.Street;
    const buildNumValidator = form.value.buildNum;
    // filter.test(CityValidator)||filter.test(LnameValidator)||filter.test(FnameValidator)||filter.test(StreetValidator)||num.test(buildNumValidator)
    const user = JSON.parse(localStorage.getItem('signData'));
    let AddAddress = {};
    if (user) {
      // tslint:disable-next-line:forin
      for (const key in form.value) {
        const value = form.value[key];
        if (value === '') {
          form.value[key] = null;
        }
      }
      let addressId = id;
      if (addressId === 0) {
        addressId = null;
        AddAddress = {
          address_id: addressId,
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
        if (form.value.City === null || form.value.Lname === null || form.value.Fname === null || form.value.Street === null ||
          form.value.buildNum === null || form.value.MobileNumber === null  ||/\S/.test(form.value.City)===false||
          /\S/.test(form.value.Lname)===false||
          /\S/.test(form.value.Fname)===false ||/\S/.test(form.value.Street)===false|| /\S/.test(form.value.buildNum)===false||
          /\S/.test(form.value.MobileNumber)===false) {
          Swal.fire('you have to complete fields', '', 'error');
          console.log(AddAddress);
        } else {
          this.itemService.address(AddAddress).subscribe(data => {
            localStorage.setItem('UserAddress', JSON.stringify(data));
            if (data.error !== true) {
              Swal.fire('Address Added!', '', 'success');
              this.router.navigate(['Account/MyAddresses']);
            } else {
              Swal.fire('error!', '', 'error');
              console.log(data);
              console.log(addressId);
            }
          });
        }
      } else {
        addressId = id;
        AddAddress = {
          address_id: addressId,
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
        if (form.value.City === null || form.value.Lname === null || form.value.Fname === null || form.value.Street === null ||
          form.value.buildNum === null || form.value.MobileNumber === null  ||/\S/.test(form.value.City)===false||
          /\S/.test(form.value.Lname)===false||
          /\S/.test(form.value.Fname)===false ||/\S/.test(form.value.Street)===false|| /\S/.test(form.value.buildNum)===false||
          /\S/.test(form.value.MobileNumber)===false) {
          Swal.fire('you have to complete fields', '', 'error');
          console.log(AddAddress);
        } else {
          this.itemService.address(AddAddress).subscribe(data => {
            localStorage.setItem('UserAddress', JSON.stringify(data));
            if (data.error !== true) {
              Swal.fire('Address Added!', '', 'success');
              this.router.navigate(['Account/MyAddresses']);
            } else {
              Swal.fire('error!', '', 'error');
              console.log(data);
              console.log(addressId);
            }
          });
        }
      }

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
        console.log(data);
        if (data.message === 'no matching email') {
          Swal.fire('no matching email', '', 'error');
        } else if (data.message === 'Wrong password') {
          Swal.fire('Wrong password', '', 'error');
        } else {
          localStorage.setItem('signData', JSON.stringify(data));
          this.userData = localStorage.getItem('signData');
          this.log.next(this.userData);
          Swal.fire('Login successful!', '', 'success');
          this.router.navigate(['home']);
        }
      });
    } else {
      Swal.fire('Your mail is wrong!', '', 'error');
    }
  }

  fbLogIn(userData) {
    console.log(userData);
    const signInData = {
      email: userData.email,
      fb_id: userData.id,
      first_name: userData.firstName,
      last_name: userData.lastName,
      fb_token: userData.authToken,
      picture: userData.photoUrl
    };


    console.log('signInData', signInData);
    this.itemService.facebook(signInData).subscribe(data => {
      console.log('facebookURL');
      localStorage.setItem('signData', JSON.stringify(data));
      this.userData = localStorage.getItem('signData');
      this.log.next(this.userData);
      console.log(data);
      this.router.navigate(['home']);
    });
  }

  changeImg(file) {
    const imgData = {
      ProfileImage: file,
      UserID: this.userData.user.id,
    };
    return this.changeImg(imgData).subscribe(data => {
      console.log(data);
    });
  }

  removeId() {
    this.router.navigate(['home']);
    localStorage.removeItem('signData');
    this.userData = localStorage.getItem('signData');
    this.log.next(this.userData);
    location.reload();
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
      Swal.fire('Added to cart!', '', 'success');
    }
  }

  addTOWishList(product) {
    if (localStorage) {
      let wishList = [];
      if (localStorage.wishList) {
        wishList = JSON.parse(localStorage.wishList);
      }
      if (!wishList.includes(product.id)) {
        wishList.push(product.id);
      }
      localStorage.wishList = JSON.stringify(wishList);
      this.getwishListItems();
      Swal.fire('Added to wishList!', '', 'success');
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

  removeToWishList(id) {
    const itemsArray = JSON.parse(localStorage.wishList);
    for (let index = 0; index < itemsArray.length; index++) {
      if (itemsArray[index] === id) {
        itemsArray.splice(index, 1);
        localStorage.wishList = JSON.stringify(itemsArray);
        $('#cart_item_' + id).fadeOut();
      }
    }
    this.getwishListItems();
  }

  getCartObservable() {
    return this.cart.asObservable();
  }

  getwishListObservable() {
    return this.wishList.asObservable();
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

  getwishListItems() {
    if (localStorage.wishList) {
      const ids = JSON.parse(localStorage.wishList);
      this.itemService.getBroductById({ids}).subscribe(data => {
        if (!data.error) {
          this.wishList.next(data.products);
        } else {
          this.wishList.next([]);
        }
      });
    } else {
      this.wishList.next([]);
    }
  }
}
