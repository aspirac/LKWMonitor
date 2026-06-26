
//const axios = require('axios');
sap.ui.define([
    "sap/m/MessageToast",
    "./DbaseTransactions",
      "./axios"

], function (MessageToast,
    db,

    axios




) {
    'use strict';

    return {
       
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        syncWait: function (ms, cb) {
            var waitDateOne = new Date();
            while ((new Date()) - waitDateOne <= ms) {
                //Nothing
            }
            if (cb) {
                eval(cb);
            }
        },
        setStatus: function (oObject, obj, status) {

            let properties = [
                {
                    entity: "/Process",
                    property: "processStatusID_ID",
                    value: status
                }
            ];
            this.displayMsg("Status wird geändert in Frei zur Einfahrt");
            let lv_url = this.getOdataUrl("FSAInfo");
        //    console.log("=====>>>>URL>>>" + lv_url);
            db.setValue(oObject, obj, properties);



            //  oBindList.refresh();
        },
        displayMsg: function (msg) {
            MessageToast.show(msg);

        },
        getOdataUrl: function(oOdata) {
            debugger;
            let lv_url = window.location.href;
            var partsArray = lv_url.split('ns.ddrmcap');
            return partsArray[0] + 'odata/v4/waage-data/' + oOdata;
    
          
             },

        getLabel(s) {
           // var oResourceBundle = resourceBundle.create({ url: "/app/ddrmcap/webapp/i18n/i18n_de.properties" });
            //  return oResourceBundle.getText(s);
            return "123";
        }
        ,
        formatXface(oObject, obj, xresult) {
            db.setValue(oObject, obj, xresult);


        },
        callAPI: async function (oURL, oLicencePlate, oDriverName) {
                    try {
                    const apiKey = 'DEMO_KEY'; 
                    const startDate = '2025-06-01';
                    const endDate = '2025-06-08';
           debugger;
                    const apiURL = oURL + '(LKWKennzeichen = \'' + oLicencePlate + '\', Fahrername = \'' + oDriverName + '\' )';
                    const apiResponse = await axios.get(apiURL);
                    return;
                  
        
                } catch (error) {
                    // Handle errors during API call
                    console.error(error.message);
                    req.error(500, 'An error occurred while fetching data from the ODATA API.');
                }
                }
    };

});


