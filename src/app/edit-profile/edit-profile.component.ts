import {Component, OnInit} from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import {Router} from '@angular/router';
declare var $: any;
// @ts-ignore
const Swal = require('sweetalert2');

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  constructor(private itemService: ItemService,private storageService: StorageService,private router: Router) {
  }

  userdata = this.storageService.getUserData();
  id: any;
  data: any;
  edit(form) {
    if (this.userdata !== null) {
      this.data = this.userdata.user;
      this.id=this.data.id;
      const password = $('#password').val();
      const rePassword = $('#rePassword').val();
      if (password === rePassword) {
        this.storageService.EditUserProfile( this.id,form);
      } else {
        Swal.fire('New Password isn`t Matches', '', 'error');
      }
    }
  }
  ngOnInit() {
    if (this.userdata !== null) {
      this.data = this.userdata.user;
    } else {
      Swal.fire('You have to Logged in ', '', 'error');
      this.router.navigate(['home']);
    }

    window.scrollTo(0, 0);
  }

}
