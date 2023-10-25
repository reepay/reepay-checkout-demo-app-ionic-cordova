/**
*   Example of native iOS WebView (for iOS15+)
*/

import Foundation
import UIKit
import WebKit

@available(iOS 14.0, *)
class CheckoutViewController: UIViewController {

    let webView: WKWebView = {
        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences = prefs
        let webView = WKWebView(frame: .zero, configuration: configuration)
        return webView
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("Init WebView")
        view.addSubview(getWebView())
    }
    
    func getWebView() -> WKWebView {
        let url = URL(string: ReepayCheckout.checkoutUrl)
        webView.load(URLRequest(url: url!))
        webView.customUserAgent = "iPhone \(UIDevice.current.modelName) - iOS \(UIDevice.current.systemVersion)"
        DispatchQueue.main.asyncAfter(deadline: .now()+5, execute: {
            self.webView.evaluateJavaScript("document.body.innerHTML") { result, error in
                guard let html = result as? String, error == nil else {
                    return
                }
                print("JS evaluated")
                // print(html) // prints html content of reepay checkout
            }
        })

        // observers
        webView.addObserver(self, forKeyPath: "URL", options: .new, context: nil)

        return webView
    }
    
    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if let key = change?[NSKeyValueChangeKey.newKey] {
            
            let urlNSURL = key as! NSURL
            let urlNSSTRING = urlNSURL.absoluteString
            
            // Todo: listen to redirected url for accept/cancel payment event

            if(urlNSSTRING!.contains("https://sandbox.reepay.com/api/httpstatus/200/cancel")){
                print("Cancel URL: \(key)")
                self.dismiss(animated: true)
                ReepayCheckout.nc.post(name: Notification.Name("sendCancelEvent"), object: nil)
            }
            
            if(urlNSSTRING!.contains("https://sandbox.reepay.com/api/httpstatus/200/accept")){
                print("Accept URL: \(key)")
                self.dismiss(animated: true)
                ReepayCheckout.nc.post(name: Notification.Name("sendAcceptEvent"), object: nil)
            }
        
        }
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        ReepayCheckout.nc.removeObserver(self, name: Notification.Name("sendCancelEvent"), object: nil)
        ReepayCheckout.nc.removeObserver(self, name: Notification.Name("sendAcceptEvent"), object: nil)
        webView.removeObserver(self, forKeyPath: "URL")
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        webView.frame = view.bounds
    }

}

extension UIDevice {
    var modelName: String {
        var systemInfo = utsname()
        uname(&systemInfo)
        let machineMirror = Mirror(reflecting: systemInfo.machine)
        let identifier = machineMirror.children.reduce("") { identifier, element in
            guard let value = element.value as? Int8, value != 0 else { return identifier }
            return identifier + String(UnicodeScalar(UInt8(value)))
        }
        return identifier
    }
}
