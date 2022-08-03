import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardCheckoutPage } from './card-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: CardCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardCheckoutPageRoutingModule {}
