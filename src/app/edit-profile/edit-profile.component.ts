import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
UserDetails: any ;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.storageService.getUserObservable().subscribe({
      next : logIn => {
        this.UserDetails= JSON.parse(logIn);
        alert('hi');
        console.log(logIn);
      }
    });
  }

}
