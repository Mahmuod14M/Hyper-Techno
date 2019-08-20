import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  constructor(private storageService: StorageService) {
  }
  userdata = this.storageService.getUserData();
  data =this.userdata.user;
  ngOnInit() {
    console.log(this.data);
    window.scrollTo(0, 0);
  }

}
