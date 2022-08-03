import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'card-checkout',
    loadChildren: () => import('./card-checkout/card-checkout.module').then(m => m.CardCheckoutPageModule)
  },
  {
    path: 'mobilepay-checkout',
    loadChildren: () => import('./mobilepay-checkout/mobilepay-checkout.module').then(m => m.MobilepayCheckoutPageModule)
  },
  {
    path: 'android-card-checkout',
    loadChildren: () => import('./android-card-checkout/android-card-checkout.module').then( m => m.AndroidCardCheckoutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
