
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './productList-routing.module';
import { ProductListComponent } from './product-list.component';
import {Ng5SliderModule} from 'ng5-slider';
@NgModule({
  imports: [
    CommonModule,
    ProductListRoutingModule,
    Ng5SliderModule
  ],
  declarations: [ProductListComponent]
})
export class ProductListModule { }
