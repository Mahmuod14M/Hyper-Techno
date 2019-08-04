import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
declare var $: any;
// @ts-ignore
const Swal = require('sweetalert2');
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
    const password = $('#password').val();
    const rePassword = $('#rePassword').val();
    if (password===rePassword) {
      this.storageService.register(form);
    } else {
      Swal.fire('Password isn`t correct', '', 'error');
    }
  }
  signOut(): void {
    this.authService.signOut();
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
