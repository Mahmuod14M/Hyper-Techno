import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-sigin-up',
  templateUrl: './sigin-up.component.html',
  styleUrls: ['./sigin-up.component.css']
})
export class SiginUpComponent implements OnInit {
  constructor(private itemService: ItemService,private storageService: StorageService,private authService: AuthService) {

    this.storageService.getUserObservable().subscribe({
      next : logIn => {
        this.logIn =logIn;
      }
    });
  }
  logIn: any ;
  private user: SocialUser;
  private loggedIn: boolean;
  register(form) {
    this.storageService.register(form);
  }
  signInWithGoogle(): void {
 this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log('user',user);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
