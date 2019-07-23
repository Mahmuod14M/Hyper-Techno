import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {CarouselModule} from 'ngx-owl-carousel-o';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {NgbModule, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {SeemorePipe} from './see-more.pipe';
import {OwlModule} from 'ngx-owl-carousel';

import 'jquery';
import {AboutUsComponent} from './about-us/about-us.component';
import {ItemComponent} from './item/item.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {JwSocialButtonsModule} from 'jw-angular-social-buttons';

import {Ng5SliderModule} from 'ng5-slider';
import {ProductListComponent} from './product-list/product-list.component';
import {StorageService} from './storage.service';
import {SiginUpComponent} from './sigin-up/sigin-up.component';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {ChangeColorDirective} from './change-color.directive';
import {PolicyComponent} from './policy/policy.component';
import {InstallmentsComponent} from './installments/installments.component';
import {CartComponent} from './cart/cart.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddAddressComponent } from './add-adress/add-address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { TrackOrderComponent } from './track-order/track-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  }
]);
export function provideConfig() {
  return config;
}
const appRoutes: Routes =
  [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'aboutUs', component: AboutUsComponent},
    {path: 'contactUs', component: ContactUsComponent},
    {path: 'item/:id', component: ItemComponent},
    {path: 'product/:page/:id', component: ProductListComponent},
    {path: 'siginUp', component: SiginUpComponent},
    {path: 'policy', component: PolicyComponent},
    {path: 'Installments', component: InstallmentsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'address', component: AddAddressComponent},
    {path: 'address/:id', component: AddAddressComponent},
    {path: 'EditProfile', component: EditProfileComponent},
    {path: 'Account/:pageName', component: TrackOrderComponent},
  ];

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    SeemorePipe,
    AboutUsComponent,
    ItemComponent,
    ContactUsComponent,
    ProductListComponent,
    SiginUpComponent,
    NavbarComponent,
    ChangeColorDirective,
    PolicyComponent,
    InstallmentsComponent,
    CartComponent,
    EditProfileComponent,
    AddAddressComponent,
    TrackOrderComponent,
    OrderDetailsComponent,
    ShippingAddressComponent,
    AccountSettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbAlertModule,
    NgbModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    CarouselModule,
    SocialLoginModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    }),
    BrowserModule,
    OwlModule,
    JwSocialButtonsModule,
    Ng5SliderModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
  ],

  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    NgbDropdownConfig,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
