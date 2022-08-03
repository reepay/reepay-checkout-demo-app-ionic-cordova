import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { ApiService } from '../core/services/api.service';
import { CheckoutService } from '../core/services/checkout.service';


@Component({
  selector: 'app-card-checkout',
  templateUrl: './card-checkout.page.html',
  styleUrls: ['./card-checkout.page.scss'],
})
export class CardCheckoutPage implements OnInit, AfterViewInit {

  public orderHandle = '';
  public customerHandle = '';
  public sessionUrl = '';
  public sessionId = '';

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
  }

  ngAfterViewInit(): void {
  }

  reset() {
    this.orderHandle = '';
    this.customerHandle = '';
    this.sessionUrl = '';
    this.sessionId = '';
  }

  generate() {
    if (this.customerHandle) {
      this.apiService.getChargeSession(this.customerHandle, this.orderHandle)
        .then((session: any) => {
          this.onAccept(session);
        })
        .catch((rejected) => {
          this.onCancel(rejected);
        });
      return;
    }

    this.apiService.getCustomerHandle().then((customerHandle: string) => {
      this.apiService.getChargeSession(customerHandle, this.orderHandle)
        .then((session: any) => {
          this.onAccept(session);
        })
        .catch((rejected) => {
          this.onCancel(rejected);
        });
    });
  }

  create() {
    if (this.isIosPlatform) {
      this.checkoutService.open().then((result) => {
        console.log(result);
      });
      return;
    }

    const id = this.sessionId;
    this.navController.navigateForward(['/android-card-checkout'], { queryParams: { id } });
  }

  private async onAccept(response) {
    console.log(response);
    const alert = await this.alertController.create({
      header: 'Response',
      message: JSON.stringify(response),
      buttons: [
        {
          text: 'Create session',
          handler: () => {
            this.sessionUrl = response.url;
            this.sessionId = response.id;

            if (this.isIosPlatform) { this.checkoutService.init(this.sessionUrl); }
          }
        },
      ],
    });
    await alert.present();
  }

  private async onCancel(response) {
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
