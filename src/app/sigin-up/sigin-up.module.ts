
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiginUpRoutingModule } from './sigin-up-routing.module';
import { SiginUpComponent } from './sigin-up.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SiginUpRoutingModule,
    FormsModule
  ],
  declarations: [SiginUpComponent]
})
export class SiginUpModule { }
