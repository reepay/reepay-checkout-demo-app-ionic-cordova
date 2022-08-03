# Reepay Checkout - Ionic Cordova Example

This is an example of Reepay Checkout using [Ionic v6.20.1](https://ionicframework.com/docs/cli) & [Cordova v11.0.0](https://cordova.apache.org/#getstarted).

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
- [Usage](#usage)
  - [Reepay Private API Key](#reepay-private-api-key)
- [Troubleshooting](#troubleshooting)
  - [ReepayCheckout plugin issues](#reepaycheckout-plugin-issues)
  - [Android platform issues](#android-platform-issues)
  - [iOS platform issues](#ios-platform-issues)

## Available Scripts

### `ionic serve`

Runs your app in the browser.

```
$ ionic serve
```

### ionic cordova build android

Builds the Android platform and runs on an Android device/emulator.

```
$ ionic cordova build android
```

For removing the platform, you can use `ionic cordova platform remove android`.

### ionic cordova build ios

Builds the Android platform and runs on an iOS device/emulator.

```
$ ionic cordova build ios
```

For removing the platform, you can use `ionic cordova platform remove ios`.

### ionic cordova plugin

The Cordova plugin is required for iOS devices (iOS 15+) as it implements a native WebView.

To add the example of Reepay Checkout plugin:

```
$ ionic cordova plugin add plugins_src/ReepayCheckout
```

To remove the plugin:

```
$ ionic cordova plugin remove cordova-plugin-reepay-checkout
```

## Usage
