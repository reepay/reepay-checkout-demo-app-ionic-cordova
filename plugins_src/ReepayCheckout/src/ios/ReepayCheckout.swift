@available(iOS 14.0, *)
@objc(ReepayCheckout) class ReepayCheckout: CDVPlugin {
    
    static let nc = NotificationCenter.default
    static var checkoutUrl = ""
    
    private var acceptEventTriggerObj : String = ""
    private var CancelEventTriggerObj : String = ""
    var checkoutVC = CheckoutViewController()

    @objc(registerAcceptEvent:)
    func registerAcceptEvent(command: CDVInvokedUrlCommand) {
        let checkoutUrl = command.arguments[0] as! String;
        ReepayCheckout.checkoutUrl = checkoutUrl

        print("registerAcceptEvent")
        self.acceptEventTriggerObj = command.callbackId;
        
        ReepayCheckout.nc.addObserver(self, selector: #selector(sendCancelEvent), name: Notification.Name("sendCancelEvent"), object: nil)

        return;
    }

    @objc(registerCancelEvent:)
    func registerCancelEvent(command: CDVInvokedUrlCommand) {      
        print("registerCancelEvent")
        
        self.CancelEventTriggerObj = command.callbackId;
        return;
    }

    @objc func sendAcceptEvent() {
        print("send accept event")
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["Accepted"])
        // pluginResult?.keepCallback = true
        self.commandDelegate.send(pluginResult, callbackId: self.acceptEventTriggerObj)
    }

    @objc func sendCancelEvent() {
        print("send cancel event")
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["Canceled"])
        // pluginResult?.keepCallback = true
        self.commandDelegate.send(pluginResult, callbackId: self.CancelEventTriggerObj)
    }

    @available(iOS 15.0, *)
    @objc(openCheckout:)
    func openCheckout(command: CDVInvokedUrlCommand) {
        checkoutVC = CheckoutViewController()

        if let sheet = self.checkoutVC.sheetPresentationController {
            sheet.detents = [.large()]
        }
        self.checkoutVC.isModalInPresentation = true
        viewController.present(self.checkoutVC, animated: true, completion: nil)
        
        var pluginResult = CDVPluginResult (status: CDVCommandStatus_ERROR, messageAs: "openCheckout - failed");
        pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: "openCheckout - succeeded");
        self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }

}
