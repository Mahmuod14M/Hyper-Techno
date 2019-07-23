import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hyper-techno';

 private cart = [];
  ngOnInit() {
  if (localStorage.cartID) {
    this.cart = JSON.parse(localStorage.cartID);
  }

}

}
