import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-add-adress',
  templateUrl: './add-adress.component.html',
  styleUrls: ['./add-adress.component.css']
})
export class AddAdressComponent implements OnInit {

  address(form) {
    this.storageService.address(form);
  }
  constructor(private storageService: StorageService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
