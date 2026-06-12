const cds = require('@sap/cds');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
const axios = require('axios');

module.exports = cds.service.impl(async function () {

    // Handle READ event for NearEarthObjects entity
    this.on('READ', 'WaageInfo', async (req) => {
        try {
            debugger;
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
    });


    // DEMO FUNCTION - getSumBookPrices function implementation
    this.on('PutWaageInfo', async (req) => {

        try {
            debugger;
            if (!req.data.LKWKennzeichen || !req.data.Fahrername) {
                req.error(400, 'LKWKennzeichen and Fahrername are required parameters.');
                return;
            }

            console.log("=====>>>>LKWKennzeichen Params>>>" + req.data.LKWKennzeichen);
            console.log("=====>>>>Fahrername Params>>>" + req.data.Fahrername);
            let lv_LKWKennzeichen = req.data.LKWKennzeichen;
            let lv_Fahrername = req.data.Fahrername;
            console.log("=====>>>>LKWKennzeichen>>>" + lv_LKWKennzeichen);
            console.log("=====>>>>Fahrername>>>" + lv_Fahrername);

            const { Process } = cds.entities;
            const { uuid } = cds.utils;
            let lv_id = uuid(); // generates a new UUID


            let lv_processTypeID = '10 - Auslieferung palettierte Ware';
            let lv_processStatusID = '20 - Frei zur Einfahrt';
            const { maxID } = await SELECT.one  `max(processID) as maxID` .from (Process)
            console.log("=====>>>>MAX ID>>>" + maxID);
            let lv_maxID = maxID + 1;
            const { INSERT } = cds.ql;
            const NewProcess = [
                {
                    ID: lv_id,
                    processID: lv_maxID,
                    processTypeID_ID: lv_processTypeID,
                    processStatusID_ID: lv_processStatusID,
                    LKW_Kennzeichen: lv_LKWKennzeichen,
                    Fahrername: lv_Fahrername
                }
            ];
            console.log("=====>>>>INSERT ID>>>" + NewProcess[0].ID);
            console.log("=====>>>>INSERT MAX ID>>>" + NewProcess[0].processID);
            console.log("=====>>>>INSERT PROCESS TYPE>>>" + NewProcess[0].processTypeID_ID);
            console.log("=====>>>>INSERT PROCESS STATUS>>>" + NewProcess[0].processStatusID_ID);
            console.log("=====>>>>INSERT PROCESS LKW>>>" + NewProcess[0].LKW_Kennzeichen);
            console.log("=====>>>>INSERT PROCESS DRIVER>>>" + NewProcess[0].Fahrername);
            const { result } = await INSERT.into(Process).entries(NewProcess);
            return result;

        } catch (error) {
            // Handle errors during API call

            req.error(500, 'An error occurred while inserting data .');
            console.error(error.message);
        }

    });

    // DEMO FUNCTION - getSumBookPrices function implementation
    this.on('GetWaageInfo', async (req) => {

        try {
            debugger;
            if (!req.data.LKWKennzeichen || !req.data.Fahrername) {
                req.error(400, 'LKWKennzeichen and Fahrername are required parameters.');
                return;
            }
            console.log("=====>>>>LKWKennzeichen Params>>>" + req.data.LKWKennzeichen);
            console.log("=====>>>>Fahrername Params>>>" + req.data.Fahrername);
            let lv_LKWKennzeichen = req.data.LKWKennzeichen;
            let lv_Fahrername = req.data.Fahrername;
            console.log("=====>>>>LKWKennzeichen>>>" + lv_LKWKennzeichen);
            console.log("=====>>>>Fahrername>>>" + lv_Fahrername);
            const { Process } = cds.entities
            let WaageInfo = SELECT.from(Process).where`LKW_Kennzeichen = ${lv_LKWKennzeichen}`.and`Fahrername = ${lv_Fahrername}`;
            return (WaageInfo);


        } catch (error) {
            // Handle errors during API call
            console.error(error.message);
            req.error(500, 'An error occurred while fetching data .');
        }

    });
});