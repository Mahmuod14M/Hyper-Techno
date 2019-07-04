import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

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
  constructor(private itemService: ItemService,private storageService: StorageService,private authService: AuthService) {

    this.storageService.getUserObservable().subscribe({
      next : logIn => {
        this.logIn =logIn;
      }
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
