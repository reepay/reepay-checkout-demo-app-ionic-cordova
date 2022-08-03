import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'list' },
    { title: 'Card Checkout', url: '/card-checkout', icon: 'card' },
    // { title: 'MobilePay Checkout', url: '/mobilepay-checkout', icon: 'phone-portrait' },
  ];
  constructor() {}
}
