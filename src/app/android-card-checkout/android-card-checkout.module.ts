import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AndroidCardCheckoutPageRoutingModule } from './android-card-checkout-routing.module';

import { AndroidCardCheckoutPage } from './android-card-checkout.page';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AndroidCardCheckoutPageRoutingModule,
    CoreModule,
  ],
  declarations: [AndroidCardCheckoutPage]
})
export class AndroidCardCheckoutPageModule {}
