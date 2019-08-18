import {Component, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular5-social-login';

declare var $: any;
// @ts-ignore
const Swal = require('sweetalert2');

@Component({
  selector: 'app-sigin-up',
  templateUrl: './sigin-up.component.html',
  styleUrls: ['./sigin-up.component.css']
})
export class SiginUpComponent implements OnInit {
  constructor(private itemService: ItemService, private storageService: StorageService, private router: Router,private socialAuthService: AuthService) {

    this.storageService.getUserObservable().subscribe({
      next: logIn => {
        this.logIn = logIn;
      }
    });
  }
  public facebookLogin() {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        // this.sendToRestApiMethod(userData.token);
        console.log(userData);
        this.storageService.fbLogIn(userData);
      }
    );
  }
  // sendToRestApiMethod: any;
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
