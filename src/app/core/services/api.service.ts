/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from '../models/globals.enum';
interface Payload {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private currentTime: string;

  constructor(private http: HttpClient) {}

  // getCustomerHandle(): Promise<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: 'Basic ' + this.getApiKeyBase64(),
  //   });
  //   const body = { generate_handle: true };
  //   return new Promise((resolve, reject) => {
  //     this.http
  //       .post<any>(GLOBALS.REEPAY_API_CUSTOMER_URL, body, { headers })
  //       .toPromise()
  //       .catch((err) => {
  //         console.log(err);
  //         reject(err);
  //       })
  //       .then((response) => {
  //         // console.log(response);
  //         resolve(response.handle);
  //       });
  //   });
  // }

  getChargeSession(customerHandle: string, orderHandle: string): Promise<any> {
    this.currentTime = new Date().getTime().toString();
    if (!orderHandle) {
      orderHandle = this.generateOrderHandle();
    }
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.getApiKeyBase64(),
    });
    const body: Payload = {
      order: {
        handle: orderHandle,
        // currency: 'DKK',
        order_lines: [
          {
            ordertext: 'This Product',
            amount: 12000,
            quantity: 9,
          },
          {
            ordertext: 'That Product',
            amount: 39900,
            quantity: 1,
          },
        ],
      },
      // payment_methods: ['card'],
      accept_url:
        'https://sandbox.reepay.com/api/httpstatus/200/accept/' + orderHandle,
      cancel_url:
        'https://sandbox.reepay.com/api/httpstatus/200/cancel/' + orderHandle,
    };
    if (customerHandle) {
      body.order.customer_handle = customerHandle;
    } else {
      body.order.customer = {
        handle: this.generateCustomerHandle(),
      };
    }
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(GLOBALS.REEPAY_CHECKOUT_API_SESSION_URL, body, { headers })
        .toPromise()
        .catch((err) => {
          console.log(err);
          reject(err);
        })
        .then((response) => {
          // console.log(response);
          resolve({
            url: response.url,
            id: response.id,
          });
        });
    });
  }

  private getApiKeyBase64(): string {
    return Buffer.from(GLOBALS.REEPAY_PRIVATE_API_KEY).toString('base64');
  }

  private generateOrderHandle(): string {
    return `order_ionic_${this.currentTime}`;
  }

  private generateCustomerHandle(): string {
    return `customer_ionic_${this.currentTime}`;
  }
}
