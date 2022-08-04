import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

declare let cordova: any;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public orderHandle = '';
  public customerHandle = '';
  public sessionUrl = '';
  public sessionId = '';

  constructor(
    private alertController: AlertController,
  ) { }

  // Register checkout events in native code
  registerCheckoutEvents(sessionUrl: string) {
    cordova.exec((event) => {
      console.log('fire: checkout-accept-event');
      cordova.plugins.ReepayCheckout.fireEvent('checkout-accept-event');
    }, null, 'ReepayCheckout', 'registerAcceptEvent', [sessionUrl]);

    cordova.exec((event) => {
      console.log('fire: checkout-cancel-event');
      cordova.plugins.ReepayCheckout.fireEvent('checkout-cancel-event');
    }, null, 'ReepayCheckout', 'registerCancelEvent', []);
  }

  onAcceptEvent = async () => {
    const alert = await this.alertController.create({
      header: 'Payment status',
      message: 'Payment has been accepted!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.reset();
          }
        },
      ],
    });
    await alert.present();
  };

  onCancelEvent = async () => {
    const alert = await this.alertController.create({
      header: 'Payment status',
      message: 'Payment has been canceled!',
      buttons: [
        {
          text: 'OK',
          handler: () => { }
        },
      ],
    });
    await alert.present();
  };

  /**
   * Listen to events from native code
   */
  listen() {
    cordova.plugins.ReepayCheckout.on('checkout-accept-event', this.onAcceptEvent, {});
    cordova.plugins.ReepayCheckout.on('checkout-cancel-event', this.onCancelEvent, {});
  }

  unlisten() {
    cordova.plugins.ReepayCheckout.un('checkout-accept-event', this.onAcceptEvent);
    cordova.plugins.ReepayCheckout.un('checkout-cancel-event', this.onCancelEvent);
  }

  /**
   * Opens native Reepay Checkout in native iOS webview
   *
   * @returns Promise
   */
  open(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const succ = (result) => {
        console.log('SUCCESS');
        resolve(result);
      };
      const fail = (result) => {
        console.log('FAIL');
        reject(result);
      };
      cordova.plugins.ReepayCheckout.openCheckout('', succ, fail);
    });
  }

  reset() {
    this.orderHandle = '';
    this.customerHandle = '';
    this.sessionUrl = '';
    this.sessionId = '';
  }

}
