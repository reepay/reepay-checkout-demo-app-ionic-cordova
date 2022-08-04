import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { ApiService } from '../core/services/api.service';
import { CheckoutService } from '../core/services/checkout.service';
@Component({
  selector: 'app-card-checkout',
  templateUrl: './card-checkout.page.html',
  styleUrls: ['./card-checkout.page.scss'],
})
export class CardCheckoutPage implements OnInit, OnDestroy {

  public isIosPlatform: boolean;

  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private apiService: ApiService,
    private checkoutService: CheckoutService,
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.isIosPlatform = this.platform.is('ios');
    if (this.isIosPlatform) { this.checkoutService.listen(); }
  }

  ngOnDestroy(): void {
    if (this.isIosPlatform) { this.checkoutService.unlisten(); }
  }

  reset() {
    this.checkoutService.reset();
  }

  generate() {
    if (this.checkoutService.customerHandle) {
      this.apiService.getChargeSession(this.checkoutService.customerHandle, this.checkoutService.orderHandle)
        .then((session: any) => {
          this.onSuccess(session);
        })
        .catch((rejected) => {
          this.onError(rejected);
        });
      return;
    }

    this.apiService.getCustomerHandle().then((customerHandle: string) => {
      this.apiService.getChargeSession(customerHandle, this.checkoutService.orderHandle)
        .then((session: any) => {
          this.onSuccess(session);
        })
        .catch((rejected) => {
          this.onError(rejected);
        });
    });
  }

  create() {
    if (this.isIosPlatform) {
      this.checkoutService.registerCheckoutEvents(this.checkoutService.sessionUrl);
      this.checkoutService.open().then((result) => { });
      return;
    }

    const id = this.checkoutService.sessionId;
    this.navController.navigateForward(['/android-card-checkout'], { queryParams: { id } });
  }

  private async onSuccess(response) {
    console.log(response);
    const alert = await this.alertController.create({
      header: 'Response',
      message: JSON.stringify(response),
      buttons: [
        {
          text: 'Create session',
          handler: () => {
            this.checkoutService.sessionUrl = response.url;
            this.checkoutService.sessionId = response.id;
          }
        },
      ],
    });
    await alert.present();
  }

  private async onError(response) {
    console.log(response);
    const alert = await this.alertController.create({
      header: 'Error',
      message: JSON.stringify(response),
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.error('Rejected:', response);
          }
        },
      ],
    });
    await alert.present();
  }

}
