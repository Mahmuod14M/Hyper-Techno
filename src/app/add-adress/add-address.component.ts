import {Component, OnInit} from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';
declare var $: any;
// @ts-ignore
const Swal = require('sweetalert2');
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  addressDetails: any = null;
  private id: number = null;

  address(form) {
    if ( this.addressDetails!= null) {
      form.value.ApartmentNum = $('input[name=ApartmentNum]').val();
      form.value.City = $('input[name=City]').val();
      form.value.FloorNumber = $('input[name=FloorNumber]').val();
      form.value.Fname = $('input[name=Fname]').val();
      form.value.LandlineNumber = $('input[name=LandlineNumber]').val();
      form.value.Lname = $('input[name=Lname]').val();
      form.value.LocationType = $('input[name=LocationType]').val();
      form.value.MobileNumber = $('input[name=MobileNumber]').val();
      form.value.NearstLandmark = $('input[name=NearstLandmark]').val();
      form.value.Notes = $('input[name=Notes]').val();
      form.value.Street = $('input[name=Street]').val();
      form.value.buildNum = $('input[name=buildNum]').val();
      form.value.country = $('input[name=country]').val();
      const filter = /^[a-zA-Z0-9]{3,9}/;
      const num = /^[0-9]{3,9}/;
      const LnameValidator = form.value.Lname;
      const CityValidator = form.value.City;
      const FnameValidator = form.value.Fname;
      const StreetValidator = form.value.Street;
      const buildNumValidator = form.value.buildNum;
      if (form.value.City === ''||/\S/.test(form.value.City)===false) {
        $('input[name=City]').css('border','1px solid red');
      }
      if (form.value.Lname === ''||/\S/.test(form.value.Lname)===false) {
        $('input[name=Lname]').css('border','1px solid red');
      }
      if (form.value.Fname === ''||/\S/.test(form.value.Fname)===false) {
        $('input[name=Fname]').css('border','1px solid red');
      }
      if (form.value.Street === ''||/\S/.test(form.value.Street)===false) {
        $('input[name=Street]').css('border','1px solid red');
      }
      if (form.value.buildNum === ''||/\S/.test(form.value.buildNum)===false) {
        $('input[name=buildNum]').css('border','1px solid red');
      }
      if (form.value.MobileNumber === ''||/\S/.test(form.value.MobileNumber)===false) {
        $('input[name=MobileNumber]').css('border','1px solid red');
      }
      this.storageService.address(this.id, form);
    } else {
      const filter = /^[a-zA-Z0-9]{3,9}/;
      const num = /^[0-9]{3,9}/;
      const LnameValidator = form.value.Lname;
      const CityValidator = form.value.City;
      const FnameValidator = form.value.Fname;
      const StreetValidator = form.value.Street;
      const buildNumValidator = form.value.buildNum;
      if (form.value.City === ''||/\S/.test(form.value.City)===false) {
        $('input[name=City]').css('border','1px solid red');
      }
      if (form.value.Lname === ''||/\S/.test(form.value.Lname)===false) {
        $('input[name=Lname]').css('border','1px solid red');
      }
      if (form.value.Fname === ''||/\S/.test(form.value.Fname)===false) {
        $('input[name=Fname]').css('border','1px solid red');
      }
      if (form.value.Street === ''||/\S/.test(form.value.Street)===false) {
        $('input[name=Street]').css('border','1px solid red');
      }
      if (form.value.buildNum === ''||/\S/.test(form.value.buildNum)===false) {
        $('input[name=buildNum]').css('border','1px solid red');
      }
      if (form.value.MobileNumber === ''||/\S/.test(form.value.MobileNumber)===false) {
        $('input[name=MobileNumber]').css('border','1px solid red');
      }
      this.storageService.address(this.id, form);
    }
  }
  constructor(private itemService: ItemService, private storageService: StorageService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id !== null) {
        this.itemService.get_user_address_By_id(this.id).subscribe(data => {
          this.addressDetails = data.address;
        });
      }
    });
  }

}
