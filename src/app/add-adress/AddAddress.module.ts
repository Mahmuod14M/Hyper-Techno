
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressRoutingModule } from './AddAddress-routing.module';
import { AddAddressComponent } from './add-address.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AddAddressRoutingModule,
    FormsModule
  ],
  declarations: [AddAddressComponent]
})
export class AddAddressModule { }
