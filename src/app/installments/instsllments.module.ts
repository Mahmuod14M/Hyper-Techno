
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallmentsRoutingModule } from './installments-routing.module';
import { InstallmentsComponent } from './installments.component';

@NgModule({
  imports: [
    CommonModule,
    InstallmentsRoutingModule
  ],
  declarations: [InstallmentsComponent]
})
export class InstallmentsModule { }
