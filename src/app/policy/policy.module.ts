
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';

@NgModule({
  imports: [
    CommonModule,
    PolicyRoutingModule
  ],
  declarations: [PolicyComponent]
})
export class PolicyModule { }
