import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  UserDetails=this.storageService.userData.user ;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    console.log(this.UserDetails);
    window.scrollTo(0, 0);
    // this.storageService.getUserObservable().subscribe({
    //   next : logIn => {
    //     this.UserDetails =logIn;
    //     console.log(this.UserDetails);
    //   }
    // });
    // {
    //   next: logIn => {
    //     this.UserDetails = JSON.parse(logIn);
    //     document.getElementById('imagePreview').style.backgroundImage = 'url(`https://arafa.000webhostapp.com/Hyper/uploads/` ' +
    //       '+ this.logIn.user.profile_pic)';
    //     console.log(this.UserDetails);
    //   },
    // });
  }

}
