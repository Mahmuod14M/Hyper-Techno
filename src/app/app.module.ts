import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {NgbModule, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {SeemorePipe} from './see-more.pipe';
import {OwlModule} from 'ngx-owl-carousel';
import 'jquery';
import {JwSocialButtonsModule} from 'jw-angular-social-buttons';
import {Ng5SliderModule} from 'ng5-slider';
import {StorageService} from './storage.service';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
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
    // {path: 'EditProfile', component: EditProfileComponent},
    {path: 'EditProfile', loadChildren:'./edit-profile/edit-profile.module#EditProfileModule'},
    // {path: 'Account/:pageName', component: TrackOrderComponent},
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
    // AboutUsComponent,
    // ItemComponent,
    // ContactUsComponent,
    // ProductListComponent,
    // SiginUpComponent,
    NavbarComponent,
    // PolicyComponent,
    // InstallmentsComponent,
    // CartComponent,
    // EditProfileComponent,
    // AddAddressComponent,
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
  // platformBrowserDynamic().bootstrapModule(AppModule);
}
