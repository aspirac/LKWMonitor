

sap.ui.define([
    "sap/m/MessageToast",
    "./DbaseTransactions",
    "sap/base/i18n/ResourceBundle"

], function (MessageToast,
    db,
    resourceBundle,
    syncWait




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
            db.setValue(oObject, obj, properties);



            //  oBindList.refresh();
        },
        displayMsg: function (msg) {
            MessageToast.show(msg);

        },
        getLabel(s) {
            var oResourceBundle = resourceBundle.create({ url: "/app/ddrmcap/webapp/i18n/i18n_de.properties" });
            //  return oResourceBundle.getText(s);
            return "123";
        }
        ,
        formatXface(oObject, obj, xresult) {
            db.setValue(oObject, obj, xresult);


        },
                callLSEAPI: async function () {
                    try {
                    const apiKey = 'DEMO_KEY'; 
                    const startDate = '2025-06-01';
                    const endDate = '2025-06-08';
        
                    // Build NASA API URL
                    const nasaURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
                    const response = await axios.get(nasaURL);
        
                    const nearEarthObjects = response.data.near_earth_objects;
                    const results = [];
        
                    // Extract and format NEO data from response
                    for (const date in nearEarthObjects) {
                        for (const neo of nearEarthObjects[date]) {
                            results.push({
                                id: neo.id,
                                name: neo.name,
                                is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
                                nasa_jpl_url: neo.nasa_jpl_url,
                                kilometers_per_hour: neo.close_approach_data[0]?.relative_velocity?.kilometers_per_hour || 'N/A'
                            });
                        }
                    }
        
                    return results;
        
                } catch (error) {
                    // Handle errors during API call
                    console.error(error.message);
                    req.error(500, 'An error occurred while fetching data from the NASA API.');
                }
                }
    };

});


