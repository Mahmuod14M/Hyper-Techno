import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TrackOrderComponent} from './track-order/track-order.component';
import {WishListComponent} from './wish-list/wish-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'aboutUs', loadChildren: './about-us/about-us.module#AboutUsModule'},
  {path: 'contactUs', loadChildren: './contact-us/contact-us.module#ContactUsModule'},
  {path: 'item/:id', loadChildren: './item/item.module#ItemModule'},
  {path: 'product/:page/:id', loadChildren: './product-list/productList.module#ProductListModule'},
  {path: 'siginUp', loadChildren:'./sigin-up/sigin-up.module#SiginUpModule'},
  {path: 'policy', loadChildren:'./policy/policy.module#PolicyModule'},
  {path: 'Installments', loadChildren:'./installments/instsllments.module#InstallmentsModule'},
  {path: 'cart', loadChildren:'./cart/cart.module#CartModule'},
  {path: 'address', loadChildren:'./add-adress/AddAddress.module#AddAddressModule'},
  {path: 'address/:id', loadChildren:'./add-adress/AddAddress.module#AddAddressModule'},
  {path: 'EditProfile', loadChildren:'./edit-profile/edit-profile.module#EditProfileModule'},
  {path: 'Account/:pageName', component: TrackOrderComponent},
  {path: 'wishList', component: WishListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
