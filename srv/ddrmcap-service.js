
const cds = require('@sap/cds');
const { redacted } = require('@sap/cds/lib/utils/cds-utils');
const { Readable, PassThrough } = require("stream");
const axios = require('axios');
const express = require("express");
const cfenv = require('cfenv');
const TextBundle = require('@sap/textbundle').TextBundle;
const { current_transaction_isolation_level } = require('@cap-js/hana/lib/cql-functions');
//import { getOdataUrl } from './handlers/utilities.js';

class DDRMService extends cds.ApplicationService {
  init() {

    /**
     * Reflect definitions from the service's CDS model
     */
    const { Process, ProcessType, ProcessStatus } = this.entities
    /**
     * Fill in primary keys for Process.
     * Note: In contrast to Bookings and BookingSupplements that has to happen
     * upon SAVE, as multiple users could create new Travels concurrently.
     */


    /**
     * Fill in defaults for new Bookings when editing Travels.
     */
    this.on('callInterfaceScale', 'Process.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callInterfaceScale', 'Process', async req => {

      let result = await this._updateProcessData(req, false);
  
    })

    this.on('callSetStatus20', 'Process.drafts',  req => {

      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callSetStatus20', 'Process',   async req => {
      let result =  await this._updateProcessStatus(req, false);

    })

    this.before('CREATE', 'Process', async (req) => {
      debugger;
      console.log("=====>>>>BEFORE CREATE PROCESS>>>");
      const { Process } = cds.entities;
      const { maxID } = await SELECT.one`max(processID) as maxID`.from(Process)
      req.data.processID = maxID + 1;
      //   req.data.processStatusID_ID = '20 - Frei zur Einfahrt';  
    })

    this.before('CREATE', 'ProcessSAPDocumentIn', async (req) => {
      debugger;
      const { ProcessSAPDocumentIn } = cds.entities;
      console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN>>>");

      const { maxID } = await SELECT.one`max(sapDocumentInID) as maxID`.from(ProcessSAPDocumentIn)
      console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT IN>>>");
      req.data.sapDocumentInID = maxID + 1;

    })

    this.before('CREATE', 'ProcessSAPDocumentIn.drafts', async (req) => {
      debugger;
      const { ProcessSAPDocumentIn } = cds.entities;
      console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN DRAFTS>>>");

      const { maxID } = await SELECT.one`max(sapDocumentInID) as maxID`.from(ProcessSAPDocumentIn)
      console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT IN>>>");
      req.data.sapDocumentInID = maxID + 1;

    })

    this.before('CREATE', 'ProcessSAPDocumentOut.drafts', async (req) => {
      debugger;
      const { ProcessSAPDocumentOut } = cds.entities;
      console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN>>>");

      const { maxID } = await SELECT.one`max(sapDocumentOutID) as maxID`.from(ProcessSAPDocumentOut)
      console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT IN>>>");
      req.data.sapDocumentOutID = maxID + 1;

    })

    this._getOdataUrl = function (oData) {
      console.log("=====>>>>BEFORE get URL: ");
      //     let lv_url1 = window.location.href;
      let lv_url = 'https://port4004-workspaces-ws-o8m4j.eu10.applicationstudio.cloud.sap/';
      // var partsArray = lv_url.split('ns.ddrmcap');
      return lv_url + 'odata/v4/waage-data/' + oData;


    }

    this._getMessage = function (req, oMessageKey) {
      const locale = req.locale.substring(0, req.locale.indexOf("_"));;
      const loc = ('./i18n/' + 'i18n_' + locale);
      const bundle = new TextBundle(loc, locale);
      return bundle.getText(oMessageKey);
    }

    this._updateProcessData = async function (req) {
      try {
        var ProcessId = req.params[0].ID;
        var messageString;
        var q1;
        var lv_url_scale;
        var lv_url_fse;


        q1 = await SELECT.from(Process).where`ID=${ProcessId}`
        const lv_status = await this._getProcessStatus(q1, req);
        const lv_type = await this._getProcessType(q1, req);

        if (!lv_status.startsWith("20")) {
          messageString = this._getMessage(req, 'STATUS_MUST_BE_20');
          req.error(400, messageString);
          return null;
        }

        const lv_LicencePlate = q1[0].LKW_Kennzeichen;
        const lv_DriverName = q1[0].Fahrername;


        if (!lv_LicencePlate || !lv_DriverName) {
          messageString = this._getMessage(req, 'INTERFACE_NO_PARAMETERS');
          req.error(400, messageString);
          return null;
        }

        lv_url_scale = this._getOdataUrl("WaageInfo");
        let result_scale = await this._callAPI(lv_url_scale, lv_LicencePlate, lv_DriverName);
        this._performUpdateScale(req, result_scale);
        messageString = this._getMessage(req, 'INTERFACE_CALLED_SCALE');
        req.notify(messageString);


        if (lv_type.startsWith("10") || lv_type.startsWith("20")) {
          let result_fse = await this._callAPI(lv_url_fse, lv_LicencePlate, lv_DriverName);
          lv_url_fse = this._getOdataUrl("FSEInfo");
          this._performUpdateFSE(req, result_fse);
          messageString = this._getMessage(req, 'INTERFACE_CALLED_FSE');
          req.notify(messageString);

        } else {
          messageString = this._getMessage(req, 'INTERFACE_NOT_CALLED_FSE');
          req.notify(messageString);
        }

        return;

      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "updateProcessData");
        return (error.message);
      
      }
 }


 
 
    this._updateProcessStatus =    async function (req) {
        var ProcessId = req.params[0].ID;
        var messageString;
        var q1;
      try { 
          
          q1 = await SELECT.from(Process).where`ID=${ProcessId}`;
          let lv_status = this._getProcessStatus(q1, req);
          if (lv_status.startsWith("20")) {
            messageString = this._getMessage(req, 'STATUS_IS_ALREADY_20');
            req.error(400, messageString);
          
          }else {
          await this._performUpdateStatus(req, '20 - Frei zur Einfahrt');
          messageString = this._getMessage(req, 'STATUS_SET_TO_20');
          req.notify(messageString);
      
        }
          

      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message , req, "updateProcessStatus");
        return (error.message);
      
      }
    }


    this._performUpdateStatus =  async function (req, oStatus) {
      try {
         console.log("=====>>>>performUpdateStatus: To status " + oStatus);
        var ProcessId = req.params[0].ID;
         console.log("=====>>>>performUpdateStatus Process ID: " + ProcessId);
         await UPDATE.entity(Process, ProcessId)
          .set( {processStatusID_ID: oStatus });
        return;

      } catch (error) {
        // Handle errors during API call<
        console.log("=====>>>>performUpdateStatus ERROR " + ProcessId+ " " + oStatus + " " + error.message);
   //     console.error(error.message);
        this._errorMessage(error.message, req, "performUpdateStatus");
        return (error.message);
        
      }
    }

    this._performUpdateFSE = async function (req, oData) {
      try {
        var ProcessId = req.params[0].ID;

        await UPDATE.entity(Process, ProcessId)
          .set({ FSEAlternativeMenge: oData.FSEAlternativeMenge, FSETrockenGehalt: oData.FSETrockenGehalt, FSEAGewicht: oData.FSEAGewicht });
        return;

      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "performUpdateFSE");
        return (error.message);
      
      }
    }


    this._performUpdateScale = async function (req, oData) {
      try {
        let ProcessId = req.params[0].ID;
        //  console.log("=====>>>>UPDATE SCALE SCHEINNR: >>>" + oData.WaageScheinNr+ " " + ProcessId);

        let dateString = this._getDate();
        let timeString = this._getTime();
        console.log("=====>>>>UPDATE SCALE Date: >>>" + dateString + " " + timeString);
        await UPDATE.entity(Process, ProcessId)
          .set({
            WaageScheinNr: oData.WaageScheinNr,
    //        WaageScheinDate: dateString,
    //        WaageScheinTime: timeString,
            WaageScheinBruto: oData.WaageScheinBruto,
            WaageScheinNetto: oData.WaageScheinNetto,
            WaageScheinTara: oData.WaageScheinTara
          });
        req.data.WaageScheinNr = oData.WaageScheinNr;
        req.data.WaageScheinBruto = oData.WaageScheinBruto;
        req.data.WaageScheinNetto = oData.WaageScheinNetto;
        req.data.WaageScheinTara = oData.WaageScheinTara;
        return;
      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "performUpdateScale");
        return (error.message);
        
      }
    }

    this._getDate = function () {
      const d = new Date();
      const day = d.getDate();
      const month = d.getMonth();
      const year = d.getFullYear();
      return `${year}-${month}-${day}`;
    }

    this._getTime = function () {
      const d = new Date();
      const diff = d.getTimezoneOffset();
      console.log("=====>>>>diff >>>" + diff);
      const hours = d.getHours() + diff / 60; // Adjust for timezone offset
      const minutes = d.getMinutes();
      const seconds = d.getSeconds();
      return `${hours}:${minutes}:${seconds}`;
    }

    this._getProcessData = async function (oData) {
      try {

        const lv_LicencePlate = oData[0].LKW_Kennzeichen;
        const lv_DriverName = oData[0].Fahrername;
        console.log("=====>>>>DATA>>>" + lv_LicencePlate + ">>>" + lv_DriverName);
        let lv_url = this._getOdataUrl("WaageInfo");
        console.log("=====>>>>URL>>>" + lv_url);
        let result = await this._callAPI(lv_url, lv_LicencePlate, lv_DriverName);
        console.log(result);
        const apiURL = oURL + '(LKW_Kennzeichen = \'' + oLicencePlate + '\', Fahrername = \'' + oDriverName + '\' )';
        console.log("=====>>>>API URL>>>" + apiURL);
        const apiResponse = await axios.get(apiURL);
        return apiResponse;


      } catch (error) {
        // Handle errors during API call
        console.error(error.message);
        this._errorMessage(error.message, req, "getProcessData");
        return (error.message);
        
      }
    }

    this._getProcessStatus =  function (oData, req) {
      try {

        console.log("=====>>>>getProcessStatus: >>>" );
        let  lv_ProcessStatusID = oData[0].processStatusID_ID;
        console.log("=====>>>>Status>>>" + lv_ProcessStatusID);
        return lv_ProcessStatusID;
      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> getProcessStatus" );
        this._errorMessage(error.message, req, "getProcessStatus");
        return (error.message);
      
      }
    }

    this._getProcessType = async function (oData, req) {
      try {
        const lv_ProcessTypeID = oData[0].processTypeID_ID;
        console.log("=====>>>>TYPE >>>" + lv_ProcessTypeID);

        return lv_ProcessTypeID;


      } catch (error) {
        // Handle errors during API call
        console.error(error.message);
        this._errorMessage(error.message, req, "getProcessType");
        return (error.message);
      }
    }

    this._errorMessage = function (eMessage, req, loc) {
    var messageString;
     console.error(eMessage);
     messageString = this._getMessage(req, 'BTP_ERROR') + " " + eMessage + "(" + loc + ")";
     req.error(400, messageString);
 
    }

    this._callAPI = async function (oURL, oLicencePlate, oDriverName) {
      try {
        const apiURL = oURL + '(LKW_Kennzeichen = \'' + oLicencePlate + '\', Fahrername = \'' + oDriverName + '\' )';
        console.log("=====>>>>API URL>>>" + apiURL);

        // temp
        const jsonReturn = {
          "WaageScheinNr": "1234567",

          //      "WaageScheinDate": new Date(),
          //      "WaageScheinTime": new Date().toLocaleTimeString(),
          "WaageScheinBruto": 10000,
          "WaageScheinNetto": 8000,
          "WaageScheinTara": 2000,
          "FSEAlternativeMenge": 500,
          "FSETrockenGehalt": 10,
          "FSEAGewicht": 400
        };
        console.log("=====>>>>Date Call API >>>" + jsonReturn.WaageScheinDate);
        console.log("=====>>>>Time CALL API >>>" + jsonReturn.WaageScheinTime);


        //    console.log("=====>>>>FSA Menge >>>" + jsonReturn.FSEAlternativeMenge);
        return jsonReturn;
        const apiResponse = await axios.get(apiURL);
        return apiResponse;

        WaageScheinNr: Decimal;
        WaageScheinDate: DateTime;
        WaageScheinTime: Time;
        WaageScheinBruto: Decimal;
        WaageScheinNetto: Decimal;
        WaageScheinTara: Decimal;
        FSEAlternativeMenge: Decimal;
        FSETrockenGehalt: Decimal;
        FSEAGewicht: Decimal;

      } catch (error) {
        // Handle errors during API call
        console.log("=====>>>>API Error >>>" + error.message);
        const jsonReturn = {

          WaageScheinNr: 1234567,
          WaageScheinBruto: 10000,
          WaageScheinNetto: 8000,
          WaageScheinTara: 2000,
          FSEAlternativeMenge: 500,
          FSETrockenGehalt: 10,
          FSEAGewicht: 400
        };
        return jsonReturn;
        return (error.message);
        req.error(500, 'An error occurred while fetching data from the ODATA API.');
      }
    }

    /**
       * Fill in defaults for new Bookings when editing LKW Process.
       */
    
    this.before('CREATE', 'Process.drafts', async (req) => {
      debugger;
      req.data.processStatusID_ID = '20 - Frei zur Einfahrt';
    })
  
    this.on("UPDATE", "Process/mediaFile", async (req, next) => {
      const { MediaFile } = cds.entities;
      const { originalUrl } = req.req;

      if (originalUrl?.includes("content")) {
        const url = originalUrl;
        const imageID = req.params[1];

        const passThrough = new PassThrough();

        // Pipe the incoming stream to the PassThrough
        req.data.content.pipe(passThrough);

        // Collect chunks from the PassThrough
        const chunks = [];
        passThrough.on("data", (chunk) => {
          chunks.push(chunk);
        });

        passThrough.on("end", async () => {
          debugger;
          const content = Buffer.concat(chunks).toString("base64");
          await UPDATE.entity(MediaFile)
            .with({
              content: content,
              url: url,
            })
            .where({ ID: imageID });
        });
      } else {
        next();
      }
    });

    // Add base class's handlers. Handlers registered above go first.
    return super.init()

  }
}
module.exports = { DDRMService }
