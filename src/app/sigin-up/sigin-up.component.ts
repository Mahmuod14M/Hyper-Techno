import {Component, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';
// import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular5-social-login';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
declare var $: any;
// @ts-ignore
const Swal = require('sweetalert2');

@Component({
  selector: 'app-sigin-up',
  templateUrl: './sigin-up.component.html',
  styleUrls: ['./sigin-up.component.css']
})
export class SiginUpComponent implements OnInit {
  constructor(private itemService: ItemService, private storageService: StorageService, private router: Router,private authService: AuthService) {

    this.storageService.getUserObservable().subscribe({
      next: logIn => {
        this.logIn = logIn;
      }
    });
  }
  // public facebookLogin() {
  //   const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       // this.sendToRestApiMethod(userData.token);
  //       console.log(userData);
  //       this.storageService.fbLogIn(userData);
  //     }
  //   );
  // }
  // public signinWithGoogle() {
  //   const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //
  //   this.socialAuthService.signIn(socialPlatformProvider)
  //     .then((userData) => {
  //
  //      console.log(userData);
  //     });
  // }
  // sendToRestApiMethod: any;

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  userdata = StorageService.getUserData();
  logIn: any;
  private loggedIn: boolean;

  register(form) {
    const password = $('#password').val();
    const rePassword = $('#rePassword').val();
    if (password === rePassword) {
      this.storageService.register(form);
    } else {
      Swal.fire('Password isn`t correct', '', 'error');
    }
  }

  ngOnInit() {
    console.log(this.logIn);
    // if (this.logIn !== null) {
    //   Swal.fire('You Are Logged in ', '', 'success');
    //   this.router.navigate(['home']);
    // }
    window.scrollTo(0, 0);
  }
}
