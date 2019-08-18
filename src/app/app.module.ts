import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {Ng5SliderModule} from 'ng5-slider';
import {StorageService} from './storage.service';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackOrderComponent } from './track-order/track-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { WishListComponent } from './wish-list/wish-list.component';
import { SocialLoginModule, AuthServiceConfig } from 'angular5-social-login';
import { FacebookLoginProvider } from 'angular5-social-login';
import { getAuthServiceConfigs } from './socialloginConfig';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    SeemorePipe,
    NavbarComponent,
    TrackOrderComponent,
    OrderDetailsComponent,
    ShippingAddressComponent,
    AccountSettingComponent,
    WishListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbAlertModule,
    NgbModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    OwlModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule,
    [SweetAlert2Module.forRoot()],
    SocialLoginModule,
  ],

  providers: [
    {
      provide: AuthServiceConfig,useFactory: getAuthServiceConfigs
    },
    NgbDropdownConfig,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
