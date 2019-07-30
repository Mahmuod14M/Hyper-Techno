
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { artRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

@NgModule({
  imports: [
    CommonModule,
    artRoutingModule
  ],
  declarations: [CartComponent]
})
export class CartModule { }
