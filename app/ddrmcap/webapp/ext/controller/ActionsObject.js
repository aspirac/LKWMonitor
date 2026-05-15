


sap.ui.define([
    "sap/m/MessageToast",
    "./Helpers/ActionUtils",
    "./Helpers/Interface",
], function (MessageToast,
             aUtils,
             Xface
) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        oncallInterface: function (oContext, aSelectedContexts) {
            var sMsg;
            aSelectedContexts.forEach((oObject, index) => {
                const obj = oObject.getObject();
                debugger;
              
                if (obj.processStatusID_ID == '20') {
                    let result = Xface.callInterfaceScale(obj.LKW_Kennzeichen, oObject);
                    debugger;
                    let s = aUtils.getLabel("ProcessStatusDescription");
                    aUtils.formatXface(oObject, obj, result);
                    result = Xface.callInterfaceFSE(obj.LKW_Kennzeichen, oObject);
                    aUtils.formatXface(oObject, obj, result);
                
              
                 //    this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("saveSuccess");
                  //  oObject.oModel("i18n").getResourceBundle().getText("saveSuccess") + " " + Object.entries(contextData).length
                    sMsg = "Schnittstelle waren  aufrerufen für "+ obj.LKW_Kennzeichen;
                    
                } else {
                    sMsg = "Status Muss be Frei zu Einfart sein";
                  
                }
                MessageToast.show(sMsg);
            });
        }
    };
});

