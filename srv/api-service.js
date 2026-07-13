const cds = require('@sap/cds');
const { INSERT, UPSERT } = require('@sap/cds/lib/ql/cds-ql');
const { UPDATE } = require('@sap/cds/lib/ql/cds-ql');
const axios = require('axios');
//const { Process, ProcessType, ProcessStatus } = this.entities
module.exports = cds.service.impl(async function () {



    this.on('READ', 'WaageIn', async (req) => {
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

            // Extra   ct and format NEO data from response
            console.log(response.data);
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



    this.on('READ', 'WaageInfo', async (req) => {
        try {
            debugger;


            var lv_LKWKennzeichen;
            var lv_Fahrername;

            if (!req.data.LKWKennzeichen || !req.data.Fahrername) {
                //            req.error(400, 'LKWKennzeichen and Fahrername are required parameters.');
                //            return;
                lv_LKWKennzeichen = 'AA-HH 282';
                lv_Fahrername = 'DRIVER21222';

            } else {
                lv_LKWKennzeichen = req.data.LKWKennzeichen;
                lv_Fahrername = req.data.Fahrername;
            }
            console.log("=====>>>>LKWKennzeichen>>>" + lv_LKWKennzeichen);
            console.log("=====>>>>Fahrername>>>" + lv_Fahrername);
            const { Process } = cds.entities
            let WaageInfo = SELECT.from(Process).where`LKW_Kennzeichen = ${lv_LKWKennzeichen}`.and`Fahrername = ${lv_Fahrername}`;
            console.log("=====>>>>Info>>>" + WaageInfo);
            if (!WaageInfo) {
                req.error(400, 'Keine Waage Info gefunden für die angegebenen LKW Kennzeichen und Fahrername.');
                return;

                console.log("=====>>>>Select>>>" + lv_Fahrername);
            }

            console.log("=====>>>>LKWKennzeichen>>>" + lv_LKWKennzeichen);
            console.log("=====>>>>Fahrername>>>" + lv_Fahrername);

            const d = new Date().toLocaleDateString("de-DE");


            // let time = d.toTimeString();
            const WInfo = {
                LKW_Kennzeichen: lv_LKWKennzeichen,
                Fahrername: lv_Fahrername,
                WaageScheinDate: '15-06-2025',
                //       WaageScheinTime     : '14:30:00',
                WaageScheinBruto: 1001.01,
                WaageScheinNetto: 1002.02,
                WaageScheinTara: 1003.03

            }




            return (WInfo);
            // Build NASA API URL
            const apiKey = 'DEMO_KEY';
            const startDate = '2025-06-01';
            const endDate = '2025-06-08';
            const nasaURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
            const response = await axios.get(nasaURL);

            const nearEarthObjects = response.data.near_earth_objects;
            const results = [];

            // Extra   ct and format NEO data from response
            //     console.log(response.data);
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
            req.error(500, 'An error occurred while fetching data from ODATA WAAGE.');
        }
    });

    this.on('READ', 'FSAInfo', async (req) => {
        try {
            debugger;


            var lv_LKWKennzeichen;
            var lv_Fahrername;

            if (!req.data.LKWKennzeichen || !req.data.Fahrername) {
                //            req.error(400, 'LKWKennzeichen and Fahrername are required parameters.');
                //            return;
                lv_LKWKennzeichen = 'AA-HH 282';
                lv_Fahrername = 'DRIVER21222';

            } else {
                lv_LKWKennzeichen = req.data.LKWKennzeichen;
                lv_Fahrername = req.data.Fahrername;
            }
            console.log("=====>>>>LKWKennzeichen>>>" + lv_LKWKennzeichen);
            console.log("=====>>>>Fahrername>>>" + lv_Fahrername);
            const { Process } = cds.entities
            let WaageInfo = SELECT.from(Process).where`LKW_Kennzeichen = ${lv_LKWKennzeichen}`.and`Fahrername = ${lv_Fahrername}`;
            console.log("=====>>>>Info>>>" + WaageInfo);
            if (!WaageInfo) {
                req.error(400, 'Keine LSA Info gefunden für die angegebenen LKW Kennzeichen und Fahrername.');
                return;

                console.log("=====>>>>Select>>>" + lv_Fahrername);
            }

            console.log("=====>>>>LKWKennzeichen>>>" + lv_LKWKennzeichen);
            console.log("=====>>>>Fahrername>>>" + lv_Fahrername);

            const d = new Date();
            let time = d.toTimeString();
            const WInfo = {
                LKW_Kennzeichen: lv_LKWKennzeichen,
                Fahrername: lv_Fahrername,
                FSEAlternativeMenge: 2001.01,
                FSETrockenGehalt: 2001.02,
                FSEAGewicht: 2001.03


            }
            return (WInfo);
            // Build NASA API URL
            const apiKey = 'DEMO_KEY';
            const startDate = '2025-06-01';
            const endDate = '2025-06-08';
            const nasaURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
            const response = await axios.get(nasaURL);

            const nearEarthObjects = response.data.near_earth_objects;
            const results = [];

            // Extra   ct and format NEO data from response
            //     console.log(response.data);
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
            req.error(500, 'An error occurred while fetching data from ODATA WAAGE.');
        }
    });
    // DEMO FUNCTION - getSumBookPrices function implementation

    this.on('PutWaageInfo', async (req) => {

        try {
            console.log("=====>>>>ProcessID Params>>>" + req.data.ProcessID);
            let lv_ProcessID = req.data.ProcessID;
            console.log("1 -=====>>>>PROCESSid>>>" + lv_ProcessID);
            debugger;
            // Validations 

            //1. Check that process ID is provided
            if (lv_ProcessID == null) {
                req.error(400, 'ProcessID is a required parameter.');
                return;
            }
            //2. retrieve the process record from the database based on the provided process ID

            const { Process } = cds.entities;
            const { uuid } = cds.utils;
            console.log("2 -=====>>>>PROCESS lv_ProcessID>>>" + lv_ProcessID);

            q1 = await SELECT.from(Process).where`processID=${lv_ProcessID}`

            console.log("=====>>>>PROCESS id Array >>>" + q1.length);

            if (q1.length == 0) {
                console.log("=====>>>>PROCESS not found >>>" + lv_ProcessID);
                req.error(401, 'Process not found for ID ' + lv_ProcessID);
                return;

            }



            // At this point, we have validated that the process ID is provided and that a corresponding record exists in the database. We can proceed with further processing or updating the record as needed.

            // Now parse the Info from the request and prepare to insert a new record into the Process table.


            lv_WaageInfo = req.data.WaageInfo;

            //       console.log("=====>>>>Waage Info >>>" + lv_WaageInfo);   
            // check that WaageInfo is provided
            if (!lv_WaageInfo) {
                req.error(400, 'WaageInfo is a required parameter.');
                return;
            }
            // now get the object
            var obj = JSON.parse(lv_WaageInfo);

            // Validations WaageNummer
            console.log("=====>>>>Waage Info Object WaageNummer >>>" + obj.WaageNummer);
            if (!obj.WaageNummer) {
                req.error(400, 'WaageNummer is a required parameter. Must be either 1 or 2.');
                return;
            }
            if (obj.WaageNummer == 0 || obj.WaageNummer > 2) {
                req.error(400, 'WaageNummer must be either 1 or 2.');
                return;
            }
            // Validation WaageScheinNr
            if (!obj.WaageScheinNr) {
                req.error(400, 'WaageScheinNr is a required parameter.');
                return;
            }
            // done wih validations

            await performUpdateScale(q1[0].ID, obj, obj.WaageNummer);
            return;


        } catch (error) {
            // Handle errors during API call

            req.error(500, 'An error occurred while inserting data .');
            console.error(error.message);
        }

    });

    this.on('PutFSEInfo', async (req) => {

        try {
            console.log("=====>>>>ProcessID Params>>>" + req.data.ProcessID);
            let lv_ProcessID = req.data.ProcessID;
            console.log("1 -=====>>>>PROCESSid>>>" + lv_ProcessID);
            debugger;
            // Validations 

            //1. Check that process ID is provided
            if (lv_ProcessID == null) {
                req.error(400, 'ProcessID is a required parameter.');
                return;
            }
            //2. retrieve the process record from the database based on the provided process ID

            const { Process } = cds.entities;
            const { uuid } = cds.utils;
            console.log("2 -=====>>>>PROCESS lv_ProcessID>>>" + lv_ProcessID);

            q1 = await SELECT.from(Process).where`processID=${lv_ProcessID}`

            console.log("=====>>>>PROCESS id Array >>>" + q1.length);

            if (q1.length == 0) {
                console.log("=====>>>>PROCESS not found >>>" + lv_ProcessID);
                req.error(401, 'Process not found for ID ' + lv_ProcessID);
                return;

            }



            // At this point, we have validated that the process ID is provided and that a corresponding record exists in the database. We can proceed with further processing or updating the record as needed.

            // Now parse the Info from the request and prepare to insert a new record into the Process table.


            lv_FSEInfo = req.data.FSEInfo;

            console.log("=====>>>>FSE Info >>>" + lv_FSEInfo);
            // check that FSEInfo is provided
            if (!lv_FSEInfo) {
                req.error(400, 'FSEInfo is a required parameter.');
                return;
            }
            // now get the object
            var obj = JSON.parse(lv_FSEInfo);

            // Validations FSEAlternativeMenge
            console.log("=====>>>>FSE Info Object FSEAlternativeMenge >>>" + obj.FSEAlternativeMenge);
            if (!obj.FSEAlternativeMenge) {
                req.error(400, 'FSEAlternativeMenge is a required parameter.');
                return;
            }

            await performUpdateFSE(q1[0].ID, obj);
            return;


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


performUpdateScale = async function (ID, obj, o_weigh) {
    try {
        const { Process } = cds.entities;
        let ProcessId = ID;
        // 

        let date = new Date();
        if (o_weigh == 1) {
            const UpdPro1 = [
                {
                    ID: ProcessId,
                    WaageNummer: obj.WaageNummer,
                    WaageScheinNr: obj.WaageScheinNr,
                    WaageScheinBruto: obj.WaageScheinBruto,
                    WaageScheinNetto: obj.WaageScheinNetto,
                    WaageScheinTara: obj.WaageScheinTara,
                    WaageScheinDate: date
                }
            ];
            const { res1 } = await UPSERT.into(Process).entries(UpdPro1);
            console.log("=====>>>>UPDATE SCALE Date: >>>" + date + " " + o_weigh + " " + ProcessId);
                    console.console.log(res1);
        }
        if (o_weigh == 2) {
            const UpdPro2 = [
                {
                    ID: ProcessId,
                    WaageNummer2: obj.WaageNummer,
                    WaageScheinNr2: obj.WaageScheinNr,
                    WaageScheinBruto2: obj.WaageScheinBruto,
                    WaageScheinNetto2: obj.WaageScheinNetto,
                    WaageScheinTara2: obj.WaageScheinTara,
                    WaageScheinDate2: date
                }
            ];
            const { res2 } = await UPSERT.into(Process).entries(UpdPro2);
            console.log("=====>>>>UPDATE SCALE Date: >>>" + date + " " + o_weigh + " " + ProcessId);
        }

        return;
    } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        //    this._errorMessage(error.message, req, "performUpdateScale");
        return (error.message);

    }
}

performUpdateFSE = async function (ID, obj) {
    try {
        const { Process } = cds.entities;
        let ProcessId = ID;
        // 

        let date = new Date();

        const UpdPro1 = [
            {
                ID: ProcessId,
                FSEDate: date,
                FSEAlternativeMenge: obj.FSEAlternativeMenge,
                FSETrockenGehalt: obj.FSETrockenGehalt,
                FSEAGewicht: obj.FSEAGewicht
            }
        ];
        const { res1 } = await UPSERT.into(Process).entries(UpdPro1);
        console.console.log(res1);
  
        console.log("=====>>>>UPDATE FSE Date: >>>" + date + " " + ProcessId+ " " + obj.FSEAlternativeMenge + " " + obj.FSETrockenGehalt + " " + obj.FSEAGewicht);




        return;
    } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        //    this._errorMessage(error.message, req, "performUpdateFSE");
        return (error.message);

    }
}