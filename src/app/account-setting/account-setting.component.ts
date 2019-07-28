import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
declare var $: any;
@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
  UserDetails: any ;

  constructor(private itemService: ItemService, private storageService: StorageService) { }

  ngOnInit() {
    this.UserDetails = this.storageService.getUserData();
  }

}
