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
    // this shit is not working
    this.storageService.getUserObservable().subscribe({
      next: logIn => {
        this.UserDetails = JSON.parse(logIn);
        document.getElementById('imagePreview').style.backgroundImage = 'url(`https://arafa.000webhostapp.com/Hyper/uploads/` ' +
          '+ this.logIn.user.profile_pic)';
      },
      error: err => {
      }
    });
  }

}
