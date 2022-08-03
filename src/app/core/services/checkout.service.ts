import { Injectable } from '@angular/core';

declare let cordova: any;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  init(sessionUrl: string) {
    // event listeners
    const onAcceptEvent = (res) => {
      console.log('accept callbackId:', res);
      this.onPaymentAccept();
    };
    cordova.plugins.ReepayCheckout.on('checkout-accept-event', onAcceptEvent, {});

    const onCancelEvent = (res) => {
      console.log('cancel callbackId:', res);
      this.onPaymentCancel();
    };
    cordova.plugins.ReepayCheckout.on('checkout-cancel-event', onCancelEvent, {});

    // register events
    cordova.exec((event) => {
      console.log('fire: checkout-accept-event');
      cordova.plugins.ReepayCheckout.fireEvent('checkout-accept-event');
    }, null, 'ReepayCheckout', 'registerAcceptEvent', [sessionUrl]);

    cordova.exec((event) => {
      console.log('fire: checkout-cancel-event');
      cordova.plugins.ReepayCheckout.fireEvent('checkout-cancel-event');
    }, null, 'ReepayCheckout', 'registerCancelEvent', []);
  }

  onPaymentAccept() {
    console.log('Reepay payment acceptful');
  }

  onPaymentCancel() {
    console.log('Reepay payment cancel');
  }

  open(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const succ = (result) => {
        console.log('SUCC');
        console.log(JSON.stringify(result, undefined, 2));
        resolve(result);
      };
      const fail = (result) => {
        console.log('FAIL');
        console.log(JSON.stringify(result, undefined, 2));
        reject(result);
      };
      cordova.plugins.ReepayCheckout.openCheckout('', succ, fail);
    });
  }

}
