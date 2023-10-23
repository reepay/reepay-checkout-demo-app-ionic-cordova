/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBALS } from '../models/globals.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getCustomerHandle(): Promise<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + this.getApiKeyBase64() });
    const body = { generate_handle: true };
    return new Promise((resolve, reject) => {
      this.http.post<any>(GLOBALS.REEPAY_API_CUSTOMER_URL, body, { headers })
        .toPromise()
        .catch((err) => {
          console.log(err);
          reject(err);
        })
        .then(response => {
          // console.log(response);
          resolve(response.handle);
        });
    });
  }

  getChargeSession(customerHandle: string, orderHandle: string): Promise<any> {
    if (!orderHandle) { orderHandle = this.generateOrderHandle(); }
    const headers = new HttpHeaders({ Authorization: 'Basic ' + this.getApiKeyBase64() });
    const body = {
      order: {
        handle: orderHandle,
        customer: {
          handle: customerHandle,
        },
        order_lines: [
          {
            ordertext: 'This Product',
            amount: 120,
            quantity: 9,
          },
          {
            ordertext: 'That Product',
            amount: 399,
            quantity: 1,
          },
        ],
      },
      accept_url:
        'https://sandbox.reepay.com/api/httpstatus/200/accept/' + orderHandle,
      cancel_url:
        'https://sandbox.reepay.com/api/httpstatus/200/cancel/' + orderHandle,
    };
    return new Promise((resolve, reject) => {
      this.http.post<any>(GLOBALS.REEPAY_CHECKOUT_API_SESSION_URL, body, { headers })
        .toPromise()
        .catch((err) => {
          console.log(err);
          reject(err);
        })
        .then(response => {
          // console.log(response);
          resolve({
            url: response.url,
            id: response.id,
          });
        });
    });
  }

  private getApiKeyBase64(): string { return Buffer.from(GLOBALS.REEPAY_PRIVATE_API_KEY).toString('base64'); }

  /**
   * Generate example of Order Handle
   *
   * @returns order handle as "order-example-<timestamp>"
   */
  private generateOrderHandle(): string {
    const currentTime = new Date().getTime().toString();
    return `order_ionic_${currentTime}`;
  };

}
