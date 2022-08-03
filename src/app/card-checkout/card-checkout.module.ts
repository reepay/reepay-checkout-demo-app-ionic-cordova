import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardCheckoutPageRoutingModule } from './card-checkout-routing.module';

import { CardCheckoutPage } from './card-checkout.page';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardCheckoutPageRoutingModule,
    CoreModule,
  ],
  declarations: [CardCheckoutPage]
})
export class CardCheckoutPageModule { }
