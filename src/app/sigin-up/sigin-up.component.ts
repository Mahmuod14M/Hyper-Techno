import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-sigin-up',
  templateUrl: './sigin-up.component.html',
  styleUrls: ['./sigin-up.component.css']
})
export class SiginUpComponent implements OnInit {
  logIn: any ;
  register(form) {
    this.storageService.register(form);
  }
  constructor(private itemService: ItemService,private storageService: StorageService) {
    this.storageService.getUserObservable().subscribe({
      next : logIn => {
        this.logIn =logIn;
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
