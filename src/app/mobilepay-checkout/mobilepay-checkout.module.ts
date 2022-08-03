import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobilepayCheckoutPageRoutingModule } from './mobilepay-checkout-routing.module';

import { MobilepayCheckoutPage } from './mobilepay-checkout.page';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobilepayCheckoutPageRoutingModule,
    CoreModule,
  ],
  declarations: [MobilepayCheckoutPage]
})
export class MobilepayCheckoutPageModule {}
