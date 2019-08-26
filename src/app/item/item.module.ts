
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import {JwSocialButtonsModule} from 'jw-angular-social-buttons';
import {OwlModule} from 'ngx-owl-carousel';


@NgModule({
  imports: [
    CommonModule,
    JwSocialButtonsModule,
    ItemRoutingModule,
    OwlModule,
  ],
  declarations: [ItemComponent,
  ],
})
export class ItemModule { }
