import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobilepayCheckoutPage } from './mobilepay-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: MobilepayCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobilepayCheckoutPageRoutingModule {}
