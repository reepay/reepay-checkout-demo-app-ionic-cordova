/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CheckoutService } from '../core/services/checkout.service';

// Reepay SDK from "https://checkout.reepay.com/checkout.js"
declare let Reepay: any;

@Component({
  selector: 'app-android-card-checkout',
  templateUrl: './android-card-checkout.page.html',
  styleUrls: ['./android-card-checkout.page.scss'],
})
export class AndroidCardCheckoutPage implements OnInit, AfterViewInit {

  @ViewChild('rp_container') container: ElementRef | undefined;
  public rp: any;

  private sessionId: string;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
  ) {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params.id;
      console.log(this.sessionId);
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.rp = new Reepay.EmbeddedCheckout(this.sessionId, { html_element: 'rp_container' });
    this.eventHandlers();
  }

  eventHandlers() {
    this.rp.addEventHandler(Reepay.Event.Accept, (data: any) => {
      console.log(data);
      console.log('accept');
    });

    this.rp.addEventHandler(Reepay.Event.Error, (data: any) => {
      console.log(data);
      console.log('error');
    });

    this.rp.addEventHandler(Reepay.Event.Close, () => {
      console.log('close');
    });
  }

  goBack() {
    this.rp.destroy();
    this.navController.navigateBack('/card-checkout');
  }

}
