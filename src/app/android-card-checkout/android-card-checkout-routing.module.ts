import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AndroidCardCheckoutPage } from './android-card-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: AndroidCardCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AndroidCardCheckoutPageRoutingModule {}
