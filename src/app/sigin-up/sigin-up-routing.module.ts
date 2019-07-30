import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiginUpComponent } from './sigin-up.component';


const routes: Routes = [
  {
    path: '',
    component: SiginUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiginUpRoutingModule { }
