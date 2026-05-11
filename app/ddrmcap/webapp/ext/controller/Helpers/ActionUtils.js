

sap.ui.define([
    "sap/m/MessageToast",
    "./DbaseTransactions",
    "sap/base/i18n/ResourceBundle"

], function (MessageToast,
    db,
    resourceBundle




) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        setStatus: function (oObject, obj, status) {
            let properties = [
                {
                    entity: "/Process",
                    property: "processStatusID_ID",
                    value: status
                }
            ];
            db.setValue(oObject, obj, properties);
            this.displayMsg("Status wird geändert in Frei zur Einfahrt");


            //  oBindList.refresh();
        },
        displayMsg: function (msg) {
            MessageToast.show(msg);

        },
        getLabel(s){
            var oResourceBundle = resourceBundle.create({url:"/app/ddrmcap/webapp/i18n/i18n_de.properties"});
          //  return oResourceBundle.getText(s);
          return "123";
        }
        ,
        formatXface(oObject, obj, xresult) {
          
             
               db.setValue(oObject, obj, xresult);
                
            
        }
    };
});




