import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-sigin-up',
  templateUrl: './sigin-up.component.html',
  styleUrls: ['./sigin-up.component.css']
})
export class SiginUpComponent implements OnInit {
  register(form) {
    const signUpData= {
      email: form.value.Umail,
      last_name: form.value.Lname,
      first_name: form.value.Lname,
      password: form.value.password,
    };
    this.itemService.signUp(signUpData).subscribe(data=> {
      console.log(data);
      localStorage.setItem('signUpData', data.user.id);
    } );
  }
  constructor(private itemService: ItemService) {}

  ngOnInit() {
  }

}
