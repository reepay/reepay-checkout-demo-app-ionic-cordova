# Reepay Checkout - Ionic Cordova Example

This is an example of Reepay Checkout using [Ionic v8.4.1](https://ionicframework.com/docs/cli) & [Cordova v12.0.0](https://cordova.apache.org/#getstarted) & [Angular v18.2.13](https://angular.io/cli/update).

## Setup

This Ionic Cordova app requires Ionic CLI [`npm install -g @ionic/cli`](https://ionicframework.com/docs/cli) and Cordova [`npm install -g cordova`](https://cordova.apache.org/#getstarted). Install node modules with `npm install`.

```
npm install -g @ionic/cli
```

```
npm install -g cordova
```

```
npm install
```

## Table of Contents

- [Available Scripts](#available-scripts)
  - [ionic serve](#ionic-serve)
  - [ionic cordova build android](#ionic-cordova-build-android)
  - [ionic cordova build ios](#ionic-cordova-build-ios)
  - [ionic cordova plugin](#ionic-cordova-plugin)
- [Events](#events)
  - [Url path changes](#url-path-changes)
  - [Extra](#extra)
- [Usage](#usage)
  - [Reepay Private API Key](#reepay-private-api-key)
- [Troubleshooting](#troubleshooting)
  - [Android platform issues](#android-platform-issues)
  - [iOS platform issues](#ios-platform-issues)

## Available Scripts

### `ionic serve`

Runs your app in the browser.

```
$ ionic serve
```

### `ionic cordova build android`

Builds the Android platform and runs on an Android device/emulator.

```
$ ionic cordova build android
```

For removing the platform, you can use `ionic cordova platform remove android`.

### `ionic cordova build ios`

Builds the Android platform and runs on an iOS device/emulator.

```
$ ionic cordova build ios
```

For removing the platform, you can use `ionic cordova platform remove ios`.

### ionic cordova plugin

The ReepayCheckout Cordova plugin is an example of a native WebView implementation. It is required for iOS devices (works on iOS 15+).

To add ReepayCheckout plugin:

```
$ ionic cordova plugin add plugins_src/ReepayCheckout
```

To remove ReepayCheckout plugin:

```
$ ionic cordova plugin remove cordova-plugin-reepay-checkout
```

## Events
In the app, we will use URL path changes as events that WebView listens to, thus checking whether URL contains `accept` or `cancel` in the path. 

### URL path changes
As we are using WebView by passing session URL, we will receive response with as either Accept URL or Cancel URL as defined in the request body [docs](https://docs.reepay.com/reference/createchargesession):
```
{
  ...
  "accept_url":"https://webshop.com/accept/order-12345",
  "cancel_url":"https://webshop.com/decline/order-12345"
}
```
In the WebView, we will listen to URL changes when the checkout has completed a redirect, either accept or cancel by checking the URL path. For example the above cancel_url, we will check for `/decline` meaning the cancel_url has been triggered and WebView has redirected. 

### Extra
For additional parameters to be passed, use query parameters in `accept_url` or `cancel_url`. For example, `https://webshop.com/decline/order-12345?myEvent=someValue&yourEvent=anotherValue`.

## Usage

1. Generate Private API Key from your Reepay account.
2. Add the Private API Key to globals.enum.ts located at `./src/app/core/models/globals.enum.ts`.
3. Build iOS or Android platform and run your app.
4. Choose Card Checkout in the menu.
5. (Optional) Add an unique identifier for your Order and/or Customer handle.
6. Generate a charge session.
7. Create Reepay checkout in a webview.
8. Complete the purchase with a [test card](https://reference.reepay.com/api/#testing) or cancel the checkout.

### iOS build example:

https://user-images.githubusercontent.com/108516218/182845243-5771af47-4823-4b94-bf83-819798085628.MP4

### iOS open MobilePay app from WebView example:

https://user-images.githubusercontent.com/108516218/228459868-77d70487-3e61-466a-b13b-78fa31c605b6.MP4

### Reepay Private API Key

When you have generated a [Private API Key](https://app.reepay.com/#/rp/dev/api) from Reepay. Add the value to `REEPAY_PRIVATE_API_KEY` located at `./src/app/core/models/globals.enum.ts`.

## Troubleshooting

### Android platform issues

It is recommended to use Android Studio to run your app after the Android platform has been generated with `ionic cordova build android`.

### iOS platform issues

It is recommended to use Xcode to run your app after the iOS platform has been generated the first time with `ionic cordova build ios` due to `Value for SWIFT_VERSION cannot be empty`.

<img width="855" alt="swift version" src="https://user-images.githubusercontent.com/108516218/182848729-92475c5d-65d5-4069-adbe-8b88eceda62e.png">

