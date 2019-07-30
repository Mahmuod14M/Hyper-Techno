import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstallmentsComponent } from './installments.component';


const routes: Routes = [
  {
    path: '',
    component: InstallmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallmentsRoutingModule { }
