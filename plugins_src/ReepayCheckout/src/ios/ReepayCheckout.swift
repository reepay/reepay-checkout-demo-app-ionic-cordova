@available(iOS 14.0, *)
@objc(ReepayCheckout) class ReepayCheckout: CDVPlugin {
    
    static let nc = NotificationCenter.default
    static var checkoutUrl : String = ""
    
    private var acceptEventTriggerObj : String = ""
    private var cancelEventTriggerObj : String = ""
    var checkoutVC: CheckoutViewController = CheckoutViewController()

    override func pluginInitialize() {
        ReepayCheckout.nc.addObserver(self, selector: #selector(sendAcceptEvent), name: Notification.Name("sendAcceptEvent"), object: nil)
        ReepayCheckout.nc.addObserver(self, selector: #selector(sendCancelEvent), name: Notification.Name("sendCancelEvent"), object: nil)
    }

    @objc(registerAcceptEvent:)
    func registerAcceptEvent(command: CDVInvokedUrlCommand) {
        let checkoutUrl = command.arguments[0] as! String;
        ReepayCheckout.checkoutUrl = checkoutUrl
        print("registerAcceptEvent")
        self.acceptEventTriggerObj = command.callbackId;
        return;
    }

    @objc(registerCancelEvent:)
    func registerCancelEvent(command: CDVInvokedUrlCommand) {      
        print("registerCancelEvent")
        self.cancelEventTriggerObj = command.callbackId;
        return;
    }

    @objc func sendAcceptEvent() {
        print("send accept event")
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["Accepted"])
        self.commandDelegate.send(pluginResult, callbackId: self.acceptEventTriggerObj)
    }

    @objc func sendCancelEvent() {
        print("send cancel event")
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: ["Canceled"])
        self.commandDelegate.send(pluginResult, callbackId: self.cancelEventTriggerObj)
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
        
        // var pluginResult = CDVPluginResult (status: CDVCommandStatus_ERROR, messageAs: "openCheckout - failed");
        // pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: "openCheckout - succeeded");
        // self.commandDelegate!.send(pluginResult, callbackId: command.callbackId);
    }

}
