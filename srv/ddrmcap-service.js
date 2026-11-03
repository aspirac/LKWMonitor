const cds = require('@sap/cds');
const { redacted } = require('@sap/cds/lib/utils/cds-utils');
const { cloudSdk } = require('@sap-cloud-sdk/connectivity');

//import { registerDestination } from '@sap-cloud-sdk/connectivity';
const { Readable, PassThrough } = require("stream");
const axios = require('axios');
const express = require("express");
const cfenv = require('cfenv');
const TextBundle = require('@sap/textbundle').TextBundle;
const { current_transaction_isolation_level } = require('@cap-js/hana/lib/cql-functions');
const { SELECT, INSERT } = require('@sap/cds/lib/ql/cds-ql');
//import { getOdataUrl } from './handlers/utilities.js';

class DDRMService extends cds.ApplicationService {
  init() {

    /**
     * Reflect definitions from the service's CDS model
     */
    const { Process, ProcessType, ProcessStatus, SalesOrder } = this.entities
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

      let result = await this._updateProcessDataScale(req, false);

      //      let result =  this._performInsertScale(req, false);
    })

    this.on('callInterfaceFSE', 'Process.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callInterfaceFSE', 'Process', async req => {

      let result = await this._updateProcessDataFSE(req, false);

      //      let result =  this._performInsertScale(req, false);
    })
    this.on('callSetStatus20', 'Process.drafts', req => {

      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callSetStatus20', 'Process', async req => {
      let result = await this._updateProcessStatus(req, false);

    })

    this.on('updateSAPDocuments', 'Process.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('updateSAPDocuments', 'Process', async (req) => {
      debugger;
      var results = [];
      results = await this._performUpdateSAPDocuments(req);
    })

    this.on('updateSAPDocuments', 'ProcessSAPDocumentOut.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callSAPSalesOrderOut', 'ProcessSAPDocumentOut.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })


    this.on('callSAPInboundDeliveryOut', 'ProcessSAPDocumentOut.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callSAPOutboundDeliveryOut', 'ProcessSAPDocumentOut.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callSAPFreightOrderOut', 'ProcessSAPDocumentOut.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })
    this.on('callSAPFreightBookingOut', 'ProcessSAPDocumentOut.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })



    this.on('updateSAPDocuments', 'ProcessSAPDocumentIn.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })


    this.on('callSAPSalesOrderIn', 'ProcessSAPDocumentIn.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })


    this.on('callSAPInboundDeliveryIn', 'ProcessSAPDocumentIn.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callSAPOutboundDeliveryIn', 'ProcessSAPDocumentIn.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callSAPFreightOrderIn', 'ProcessSAPDocumentIn.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })
    this.on('callSAPFreightBookingIn', 'ProcessSAPDocumentIn.drafts', async req => {
      const messageString = this._getMessage(req, 'MUST_NOT_BE_DRAFT');
      req.error(400, messageString);
    })

    this.on('callSAPSalesOrderOut', 'ProcessSAPDocumentOut', async req => {
      const ID = req.params[0];
      const SalesOrders = req.data;
      console.log("=====>>>>Sales Order - Out>>>" + ID + '    ' + param);

      debugger;
      var results = [];
      var res;
      results = await this._getSAPSalesOrder(req);
      console.log("=====>>>>AFTER CALL ");
      res = this._performUpsertSAPSalesOrders(req, results);
      //  console.log(res);
    })

    this.on('callSAPInboundDeliveryOut', 'ProcessSAPDocumentOut', async req => {
      console.log("=====>>>>Inbound Delivery - Out>>>");
      debugger;
      var results = [];
      var res;
      results = await this._getSAPInboundDelivery(req);
      console.log("=====>>>>AFTER CALL ");
      res = this._performUpsertSAPInboundDelivery(req, results);


    })

    this.on('callSAPOutboundDeliveryOut', 'ProcessSAPDocumentOut', async req => {
      console.log("=====>>>>Outbound Delivery - Out>>>");
      debugger;
      var results = [];
      var res;
      results = await this._getSAPOutboundDelivery(req);
      console.log("=====>>>>AFTER CALL ");
      res = this._performUpsertSAPOutBoundDelivery(req, results);
      console.log(res);
    })

    this.on('callSAPFreightOrderOut', 'ProcessSAPDocumentOut', async req => {
      console.log("=====>>>>FreightOrder - Out>>>");
      debugger;
      var results = [];
      var res;
      results = await this._getSAPFreightOrder(req);
      console.log("=====>>>>AFTER CALL " + results);
    })

    this.on('callSAPFreightBookingOut', 'ProcessSAPDocumentOut', async req => {
      console.log("=====>>>>FreightBooking - Out>>>");
      debugger;
      var results = [];
      var res;
      results = await this._getSAPFreightBooking(req);
      console.log("=====>>>>AFTER CALL " + results);
    })

    this.on('updateSAPDocuments', 'ProcessSAPDocumentOut', async (req) => {
      debugger;
      var results = [];
      results = await this._performUpdateSAPDocuments(req);
    })

    this.on('callSAPSalesOrderIn', 'ProcessSAPDocumentIn', async req => {
      console.log("=====>>>>Sales Order - In>>>");
      debugger;
      var results = [];
      var res;
      results = await this._getSAPSalesOrder(req);

    })

    this.on('callSAPInboundDeliveryIn', 'ProcessSAPDocumentIn', async req => {
      console.log("=====>>>>Inbound Delivery - In>>>");
      debugger;
      var results = [];
      var res;
      results = await this._getSAPInboundDelivery(req);
      console.log("=====>>>>AFTER CALL ");
    })

    this.on('callSAPOutboundDeliveryIn', 'ProcessSAPDocumentIn', async req => {
      console.log("=====>>>>Outbound Delivery - In>>>");
      debugger;
      var results = [];
      var res;
      results = await this._getSAPOutboundDelivery(req);
      console.log("=====>>>>AFTER CALL ");
    })

    this.on('callSAPFreightOrderIn', 'ProcessSAPDocumentIn', async req => {
      console.log("=====>>>>FreightOrder - In>>>");
      debugger;
      var results = [];
      var res;
      results = await this._getSAPFreightOrder(req);
      console.log("=====>>>>AFTER CALL ");
    })

    this.on('callSAPFreightBookingIn', 'ProcessSAPDocumentIn', async req => {
      console.log("=====>>>>FreightBooking - In>>>");
      debugger;
      var results = [];
      var res;
      results = await this._getSAPFreightBooking(req);
      console.log("=====>>>>AFTER CALL ");
    })
    this.on('updateSAPDocuments', 'ProcessSAPDocumentIn', async (req) => {
      debugger;
      var results = [];
      results = await this._performUpdateSAPDocuments(req);
    })

    this.before('READ', 'Process', async (req) => {
      debugger;
      console.log("=====>>>>BEFORE READ PROCESS>>>");
      const { Process } = cds.entities;
      var results = [];
      results = await this._performUpdateSAPDocuments(req);
      // Initialize drafts

    })
    this.before('CREATE', 'Process', async (req) => {
      debugger;
      console.log("=====>>>>BEFORE CREATE PROCESS>>>");
      const { Process } = cds.entities;
      //  results = await this._performUpdateSAPDocuments(req);
      const { maxID } = await SELECT.one`max(processID) as maxID`.from(Process)
      req.data.processID = maxID + 1;
      //   req.data.processStatusID_ID = '20 - Frei zur Einfahrt';  
    })

    this.before('CREATE', 'Process.drafts', async (req) => {
      debugger;
      console.log("=====>>>>BEFORE CREATE PROCESS Draft>>>");
      const { Process } = cds.entities;
      debugger;
      var results = [];
      var res;
      results = await this._performUpdateSAPDocuments(req);
      console.log("=====>>>>AFTER CALL ");
    })


    this.before('CREATE', 'ProcessSAPDocumentIn', async (req) => {
      debugger;
      var results = [];
      var res;

      //    results = await this._getSAPDocuments(req);
      //    console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN NON DRAFTS >>>");
      //    res = await this._performUpsertSAPDocuments(req, results);
      //   results = await this._performUpdateSAPDocuments(req);
      const { ProcessSAPDocumentIn } = cds.entities;
      console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN - NON DRAFT>>>");

      const { maxID } = await SELECT.one`max(sapDocumentInID) as maxID`.from(ProcessSAPDocumentIn)

      console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT IN>>>");
      req.data.sapDocumentInID = maxID + 1;



    })

    this.before('CREATE', 'ProcessSAPDocumentIn.drafts', async (req) => {
      var results = [];
      var res;

      //   results = await this._getSAPDocuments(req);
      //   console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN DRAFTS >>>");
      //   res = await this._performUpsertSAPDocuments(req, results);

      const { ProcessSAPDocumentIn } = cds.entities;
      const { maxID } = await SELECT.one`max(sapDocumentInID) as maxID`.from(ProcessSAPDocumentIn)

      req.data.sapDocumentInID = maxID + 1;

    })

    this.before('CREATE', 'ProcessSAPDocumentOut', async (req) => {
      debugger;
      var results = [];
      var res;

      //    results = await this._getSAPDocuments(req);
      //    console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN NON DRAFTS >>>");
      //    res = await this._performUpsertSAPDocuments(req, results);

      const { ProcessSAPDocumentOut } = cds.entities;
      console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN - NON DRAFT>>>");

      const { maxID } = await SELECT.one`max(sapDocumentOutID) as maxID`.from(ProcessSAPDocumentOut)

      console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT OUT>>>");
      req.data.sapDocumentOutID = maxID + 1;



    })

    this.before('CREATE', 'ProcessSAPDocumentOut.drafts', async (req) => {
      debugger;
      var results = [];
      var res;

      //   results = await this._getSAPDocuments(req);
      //   console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT OUT DRAFTS >>>");
      //   res = this._performUpsertSAPDocuments(req, results);

      const { ProcessSAPDocumentOut } = cds.entities;
      console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT OUT>>>");

      const { maxID } = await SELECT.one`max(sapDocumentOutID) as maxID`.from(ProcessSAPDocumentOut)
      console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT OUT>>>");
      req.data.sapDocumentOutID = maxID + 1;

    })

    this._getDocucumentKindDesc = async function (DocKindID) {
      try {
        const {  SAPDocumentKindType } = cds.entities;
        const { SELECT } = cds.ql;
        var q1;
        var newSalesOrderEntries = [];
        var newSAPDocument;
        var newSAPDocumentEntries = [];
        // parse the documents

        q1 = await SELECT.from(SAPDocumentKindType).where`ID=${DocKindID}`;
        
        return q1;
      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "getDocucumentKindDesc");
        return (error.message);

      }
    }

       this._getBusinessPartnerName =  function (BPID) {
      try {
        const {  BusinessPartner } = cds.entities;
        const { SELECT } = cds.ql;
        var q1;
       
        // parse the documents

        q1 =  SELECT.from(BusinessPartner).where`BPID=${BPID}`;
        console.log(q1[0].Name);
        return q1;
      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "getBusinessPartner");
        return (error.message);

      }
    }
     this._performUpsertBusinessPartners = async function (req, oData) {
      try {
        const { BusinessPartner } = cds.entities;
        const { UPSERT, INSERT } = cds.ql;
        var newBusinessPartner;
        var newBusinessPartnerEntries = [];
       
        // parse the documents
         
  

        oData.forEach((item, index) => {


        newBusinessPartner = {
            BPID: oData[index].BusinessPartner,
            Supplier: oData[index].Supplier,
            Name: oData[index].OrganizationBPName1,
           
          };
          newBusinessPartnerEntries.push(newBusinessPartner);

        });
        //    await UPSERT.into(SalesOrder).entries(newSalesOrderEntries);
        await UPSERT.into(BusinessPartner).entries(newBusinessPartnerEntries);

        //   const { result } = UPSERT.into(SalesOrder).entries(newSalesOrderEntries);

        return newBusinessPartnerEntries;
      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "performInsert BusinessPartner");
        return (error.message);

      }
    }

    this._performUpsertSAPSalesOrders = async function (req, oData) {
      try {
        const { SalesOrder, SAPDocument } = cds.entities;
        const { UPSERT, INSERT } = cds.ql;
        var newSalesOrder;
        var newSalesOrderEntries = [];
        var newSAPDocument;
        var newSAPDocumentEntries = [];
        // parse the documents
        var q1 = await this._getDocucumentKindDesc('SALESORDER');
         
  

        oData.forEach((item, index) => {

/*
          newSalesOrder =
          {
            SalesOrder: oData[index].SalesOrder,

            SalesOrderType: oData[index].SalesOrderType,
            SalesOrganization: oData[index].SoldToParty,
            SalesOrganization: oData[index].SalesOrganization,
            DistributionChannel: oData[index].DistributionChannel,
            OrganizationDivision: oData[index].OrganizationDivision,
            SalesGroup: oData[index].SalesGroup,
            SalesOffice: oData[index].SalesOffice,
            SalesDistrict: oData[index].SalesDistrict,
            SoldToParty: oData[index].SoldToParty,
            CreationDate: oData[index].CreationDate,
            CreatedByUser: oData[index].CreatedByUser,
            SalesOrderDate: oData[index].SalesOrderDate


          };
          newSalesOrderEntries.push(newSalesOrder);

        */ 
       
          newSAPDocument = {
            DocNumber: oData[index].SalesOrder,
            DocType: oData[index].SalesOrderType,
            DocTypeDesc: ' ',
            DocumentKindCode: 'SALESORDER',
            DocumentKindDescription: q1[0].description,
            DocumentKindDescriptionDE: q1[0].descriptionDE,
       //     description: ' ',
            CustomerNumber: oData[index].SoldToParty,
       //     CustomerName: ' '
          };
          newSAPDocumentEntries.push(newSAPDocument);

        });
        //    await UPSERT.into(SalesOrder).entries(newSalesOrderEntries);
        await UPSERT.into(SAPDocument).entries(newSAPDocumentEntries);

        //   const { result } = UPSERT.into(SalesOrder).entries(newSalesOrderEntries);

        return newSalesOrderEntries;
      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "performInsert SalesOrder");
        return (error.message);

      }
    }

    this._performUpsertSAPInboundDelivery = async function (req, oData) {
      try {
        const { InboundDelivery, SAPDocument } = cds.entities;
        const { UPSERT } = cds.ql;
        var newInboundDelivery;
        var newInboundDeliveryEntries = [];
        var newSAPDocument;
        var newSAPDocumentEntries = [];
        var q1 = await this._getDocucumentKindDesc('INDELIVERY');
         
        // parse the documents
        oData.forEach((item, index) => {
/*

          newInboundDelivery =
          {
            DeliveryDocument: oData[index].DeliveryDocument,
            ReceivingLocationTimeZone: oData[index].ReceivingLocationTimeZone,
            ActualDeliveryRoute: oData[index].ActualDeliveryRoute,
            ActualGoodsMovementDate: oData[index].ActualGoodsMovementDate,
            ActualGoodsMovementTime: oData[index].ActualGoodsMovementTime,
            BillingDocumentDate: oData[index].BillingDocumentDate,
            BillOfLading: oData[index].BillOfLading,
            CompleteDeliveryIsDefined: oData[index].CompleteDeliveryIsDefined,
            ConfirmationTime: oData[index].ConfirmationTime,
            CreatedByUser: oData[index].CreatedByUser,
            CreationDate: oData[index].CreationDate,
            CreationTime: oData[index].CreationTime,
            CustomerGroup: oData[index].CustomerGroup,
            DeliveryBlockReason: oData[index].DeliveryBlockReason,
            DeliveryDate: oData[index].DateTime,

            DeliveryDocumentBySupplier: oData[index].DeliveryDocumentBySupplier,
            DeliveryDocumentType: oData[index].DeliveryDocumentBySupplier,
            DeliveryIsInPlant: oData[index].DeliveryIsInPlant,
            DeliveryPriority: oData[index].DeliveryPriority,
            DeliveryTime: oData[index].DeliveryTime,
            DeliveryVersion: oData[index].DeliveryVersion,
            DepreciationPercentage: oData[index].DepreciationPercentage,
            DistrStatusByDecentralizedWrhs: oData[index].DistrStatusByDecentralizedWrhs,
            DocumentDate: oData[index].DocumentDate,
            ExternalIdentificationType: oData[index].ExternalIdentificationType,
            ExternalTransportSystem: oData[index].ExternalTransportSystem,
            FactoryCalendarByCustomer: oData[index].FactoryCalendarByCustomer,
            Supplier: oData[index].Supplier

          };
          newInboundDeliveryEntries.push(newInboundDelivery);
*/
          newSAPDocument = {
            DocNumber: oData[index].DeliveryDocument,
            DocType: oData[index].SalesOrderType,
            DocTypeDesc: ' ',
            DocumentKindCode: 'INDELIVERY',
            DocumentKindDescription: q1[0].description,
            DocumentKindDescriptionDE: q1[0].descriptionDE,
      //      description: ' ',
            CustomerNumber: oData[index].Supplier,
      //      CustomerName: ' '
          };
          newSAPDocumentEntries.push(newSAPDocument);

        });

        await UPSERT.into(SAPDocument).entries(newSAPDocumentEntries);


        //   await UPSERT.into(InboundDelivery).entries(newInboundDeliveryEntries);
        return newInboundDeliveryEntries;



      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "performInsert Inbound Delivery");
        return (error.message);

      }
    }

    this._performUpsertSAPOutBoundDelivery = async function (req, oData) {
      try {
        const { OutboundDelivery, SAPDocument} = cds.entities;
        const { UPSERT } = cds.ql;
        var newOutBoundDelivery;
        var newOutBoundDeliveryEntries = [];
        var newSAPDocument;
        var newSAPDocumentEntries = [];
        var q1 = await this._getDocucumentKindDesc('OUDELIVERY');
        var q2;
          

        // parse the documents
        oData.forEach((item, index) => {

/*
          newOutBoundDelivery =
          {
            DeliveryDocument: oData[index].DeliveryDocument,
            ReceivingLocationTimeZone: oData[index].ReceivingLocationTimeZone,
            ShipingLocationTimeZone: oData[index].ShipingLocationTimeZone,
            ActualDeliveryRoute: oData[index].ActualDeliveryRoute,
            ActualGoodsMovementDate: oData[index].ActualGoodsMovementDate,
            ActualGoodsMovementTime: oData[index].ActualGoodsMovementTime,
            BillingDocumentDate: oData[index].BillingDocumentDate,
            BillOfLading: oData[index].BillOfLading,
            CompleteDeliveryIsDefined: oData[index].CompleteDeliveryIsDefined,
            ConfirmationTime: oData[index].ConfirmationTime,
            CreatedByUser: oData[index].CreatedByUser,
            CreationDate: oData[index].CreationDate,
            CreationTime: oData[index].CreationTime,
            CustomerGroup: oData[index].CustomerGroup,
            DeliveryBlockReason: oData[index].DeliveryBlockReason,
            DeliveryDate: oData[index].DateTime,
            DeliveryDocumentBySupplier: oData[index].DeliveryDocumentBySupplier,
            DeliveryDocumentType: oData[index].DeliveryDocumentBySupplier,
            DeliveryIsInPlant: oData[index].DeliveryIsInPlant,
            DeliveryPriority: oData[index].DeliveryPriority,
            DeliveryTime: oData[index].DeliveryTime,
            DeliveryVersion: oData[index].DeliveryVersion,
            DepreciationPercentage: oData[index].DepreciationPercentage,
            DistrStatusByDecentralizedWrhs: oData[index].DistrStatusByDecentralizedWrhs,
            DocumentDate: oData[index].DocumentDate,
            ExternalIdentificationType: oData[index].ExternalIdentificationType,
            ExternalTransportSystem: oData[index].ExternalTransportSystem,
            FactoryCalendarByCustomer: oData[index].FactoryCalendarByCustomer


          };
          newOutBoundDeliveryEntries.push(newOutBoundDelivery);
          */
          
//q2 =  this._getBusinessPartnerName(oData[index].SoldToParty);

      newSAPDocument = {
            DocNumber: oData[index].DeliveryDocument,
            DocType: oData[index].SalesOrderType,
            DocTypeDesc: ' ',
            DocumentKindCode: 'OUDELIVERY',
            DocumentKindDescription: q1[0].description,
            DocumentKindDescriptionDE: q1[0].descriptionDE,
      //      description: ' ',
            CustomerNumber: oData[index].SoldToParty,
       //     CustomerName: ' ',
          };
          newSAPDocumentEntries.push(newSAPDocument);
        });
        //  console.log(newOutBoundDeliveryEntries);
 //       await UPSERT.into(OutboundDelivery).entries(newOutBoundDeliveryEntries);

   await UPSERT.into(SAPDocument).entries(newSAPDocumentEntries);

        return newOutBoundDeliveryEntries;
      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message,"Perform Insert Outbound delivery");
        return (error.message);

      }
    }
    this._performUpsertSAPDocuments = async function (req, oData) {
      try {
        const { SAPDocument } = cds.entities;
        const { UPSERT } = cds.ql;
        var newSapDocument;
        var newSapDocumentEntries = [];
        // parse the documents
        oData.forEach((item, index) => {


          newSapDocument =
          {
            DocNumber: oData[index].SalesOrder,
            DocType: oData[index].SalesOrderType,
            CustomerNumber: oData[index].SoldToParty,
            DocTypeDesc: "               ",
       //     description: "               ",
       //     CustomerName: "               ",


          };
          newSapDocumentEntries.push(newSapDocument);
          UPSERT.into(SAPDocument).entries(newSapDocumentEntries);

          console.log(newSapDocumentEntries);
          newSapDocumentEntries = [];
        });


        console.log(newSapDocumentEntries);
        const { result } = UPSERT.into(SAPDocument).entries(newSapDocumentEntries);
        console.log(result);

        return;
      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "performInsertSAP");
        return (error.message);

      }
    }

    this._getSAPDocuments = async function (req) {
      try {

        var s4hanaSales = await cds.connect.to('OP_API_SALES_ORDER_SRV_0001');
        var s4hanaFreight = await cds.connect.to('CE_FREIGHTORDER_0001');

        var result;


        const { A_SalesOrder, A_SalesOrderItem } = s4hanaSales.entities;
        const { FreightOrder } = s4hanaFreight.entities;

        debugger;
        //   console.log("=====>>>>BEFORE READ SALES ORDER>>>");


        var results = [];


        //   results = await s4hanaSales.run(SELECT.from(A_SalesOrder).limit(50));
        results = await s4hanaSales.run(SELECT.from(A_SalesOrder));


        //   console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT IN getSAPDocuments>>>"+results);
        return results;
      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> getSAPDocuments");
        this._errorMessage(error.message, req, "getSAPDocuments");
        return (error.message);

      }
    }

      this._getSAPBusinessPartners = async function (req) {
      try {

        var s4hanaBusinessPartner = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV');
        var result;


        const {A_BusinessPartner} = s4hanaBusinessPartner.entities;
        debugger;
        var results = [];
        results = await s4hanaBusinessPartner.run(SELECT.from(A_BusinessPartner));
           console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT IN getBusinessPartner>>>");
        return results;
      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> getSAPBP");
        this._errorMessage(error.message, req, "getSAPBP");
        return (error.message);

      }
    }

    this._getSAPSalesOrder = async function (req) {
      try {

        var s4hanaSales = await cds.connect.to('OP_API_SALES_ORDER_SRV_0001');
        var result;


        const { A_SalesOrder, A_SalesOrderItem } = s4hanaSales.entities;
        debugger;
        var results = [];
        results = await s4hanaSales.run(SELECT.from(A_SalesOrder));
        //   console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT IN getSAPDocuments>>>"+results);
        return results;
      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> getSAPDocuments");
        this._errorMessage(error.message, req, "getSAPDocuments");
        return (error.message);

      }
    }

    this._getSAPInboundDelivery = async function (req) {
      try {


        var s4hanaInboundDelivery = await cds.connect.to('OP_API_INBOUND_DELIVERY_SRV_0002');
        var result;


        const { A_InbDeliveryHeader } = s4hanaInboundDelivery.entities;
        debugger;
        var results = [];
        results = await s4hanaInboundDelivery.run(SELECT.from(A_InbDeliveryHeader));
        return results;
      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> getSAPDocuments");
        this._errorMessage(error.message, req, "getSAPDocuments");
        return (error.message);

      }
    }


    this._getSAPOutboundDelivery = async function (req) {
      try {


        var s4hanaOutboundDelivery = await cds.connect.to('OP_API_OUTBOUND_DELIVERY_SRV_0002');
        var result;


        const { A_OutbDeliveryHeader } = s4hanaOutboundDelivery.entities;
        debugger;
        var results = [];
        results = await s4hanaOutboundDelivery.run(SELECT.from(A_OutbDeliveryHeader));
        return results;
      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> getSAPDocuments");
        this._errorMessage(error.message, req, "getSAPDocuments");
        return (error.message);

      }
    }

    this._getSAPFreightOrder = async function (req) {
      try {


        var s4hanaFreightOrder = await cds.connect.to('sap_s4_OP_API_FREIGHTORDER_0001_v1');
        var result;
        const { FreightOrder } = s4hanaFreightOrder.entities;

        debugger;
        var results = [];
        results = await s4hanaFreightOrder.run(SELECT.from(FreightOrder));
        return results;
      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> getSAPDocuments");
        this._errorMessage(error.message, req, "getSAPDocuments");
        return (error.message);

      }
    }

    this._getSAPFreightBooking = async function (req) {
      try {


        var s4hanaFreightBooking = await cds.connect.to('sap_s4_OP_API_FREIGHTBOOKING_0001_v1');
        var result;
        const { FreightBooking } = s4hanaFreightBooking.entities;

        debugger;
        var results = [];
        results = await s4hanaFreightBooking.run(SELECT.from(FreightBooking));
        return results;
      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> getSAPDocuments");
        this._errorMessage(error.message, req, "getSAPDocuments");
        return (error.message);

      }
    }

    // update all sap documents 
    this._performUpdateSAPDocuments = async function (req) {
      try {
        var results = [];
        var res;

        results = await this._getSAPBusinessPartners(req);
        console.log("=====>>>>AFTER CALL _getBP ");
        res = this._performUpsertBusinessPartners(req, results);
        results = await this._getSAPSalesOrder(req);
        console.log("=====>>>>AFTER CALL _getSAPSalesOrder ");
        res = this._performUpsertSAPSalesOrders(req, results);
        results = await this._getSAPInboundDelivery(req);
        console.log("=====>>>>AFTER CALL _getSAPInboundDelivery ");
        res = this._performUpsertSAPInboundDelivery(req, results);
        results = await this._getSAPOutboundDelivery(req);
        console.log("=====>>>>AFTER CALL _getSAPOutboundDelivery ");
        this._performUpsertSAPOutBoundDelivery(req, results);
      
   
        

      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> ");
        this._errorMessage(error.message, req, "performUpdateSAPDocuments");
        return (error.message);

      }
    }

    this._getOdataUrl = function (oData) {
      //   console.log("=====>>>>BEFORE get URL: ");
      //     let lv_url1 = window.location.href;
      let lv_url = 'https://port4004-workspaces-ws-o8m4j.eu10.applicationstudio.cloud.sap/';
      // var partsArray = lv_url.split('ns.ddrmcap');
      return lv_url + 'odata/v4/waage-data/' + oData;


    }

    this._getMessage = function (req, oMessageKey) {

      //var complete_url = window.location.href;


      var navLang = navigator.language || navigator.userLanguage;
      //   var sValue = jQuery.sap.getUriParameters().get("myUriParam");
      console.log("=====>>>>LANGUAGE " + navLang + " ");

      //   const locale = req.locale.substring(0, req.locale.indexOf("_"));
      const locale = req.locale;
      console.log("=====>>>>locale " + req.locale);
      const loc = ('./i18n/' + 'i18n_' + locale);
      const bundle = new TextBundle(loc, locale);
      return bundle.getText(oMessageKey);
    }

    this._updateProcessDataScale = async function (req) {
      try {
        var ProcessId = req.params[0].ID;
        var messageString;
        var q1;
        var lv_url_scale;
        var lv_url_fse;


        q1 = await SELECT.from(Process).where`ID=${ProcessId}`
        let lv_weigh1 = q1[0].WaageNummer;
        let lv_weigh2 = q1[0].WaageNummer2;

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
          //   messageString = this._getMessage(req, 'INTERFACE_NO_PARAMETERS');
          //   req.error(400, messageString);
          //   return null;
        }

        lv_url_scale = this._getOdataUrl("WaageInfo");
        let result_scale = await this._callAPI(lv_url_scale, lv_LicencePlate, lv_DriverName);
        console.log("=====>>>>WEIGH1 : >>> " + lv_weigh1 + " WEIGH2 : >>> " + lv_weigh2);
        if (lv_weigh1 && lv_weigh2) {
          messageString = this._getMessage(req, 'WEIGHING_IS_COMPLETED');
          req.error(400, messageString);
          return null;

        }
        if (!lv_weigh1 && !lv_weigh2) {
          lv_weigh1 = 1;
          this._performUpdateScale(req, result_scale, lv_weigh1);
          messageString = this._getMessage(req, 'INTERFACE_CALLED_SCALE_I');
          req.notify(messageString);
        } else {
          if (!lv_weigh2 && lv_weigh1) {
            lv_weigh2 = 2;
            this._performUpdateScale(req, result_scale, lv_weigh2);
            messageString = this._getMessage(req, 'INTERFACE_CALLED_SCALE_II');
            req.notify(messageString);
          }
        }
        this._performInsertScale(req, result_scale);
        //     console.log("=====>>>>CALLED INSERT SCALE: >>>");




        return;

      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "updateProcessData");
        return (error.message);

      }
    }


    this._updateProcessDataFSE = async function (req) {
      try {
        var ProcessId = req.params[0].ID;
        var messageString;
        var q1;
        var lv_url_fse;


        q1 = await SELECT.from(Process).where`ID=${ProcessId}`
        let lv_fse_date = q1[0].FSEDate;
        const lv_status = await this._getProcessStatus(q1, req);
        const lv_type = await this._getProcessType(q1, req);

        if (!lv_status.startsWith("20")) {
          messageString = this._getMessage(req, 'STATUS_MUST_BE_20');
          req.error(400, messageString);
          return null;
        }


        if (lv_type.startsWith("10") || lv_type.startsWith("20")) {
          if (lv_fse_date) {
            messageString = this._getMessage(req, 'FSE_INFO_ALREADY_EXISTS');
            req.error(400, messageString);
            return null;

          }
          const lv_LicencePlate = q1[0].LKW_Kennzeichen;
          const lv_DriverName = q1[0].Fahrername;
          let result_fse = await this._callAPI(lv_url_fse, lv_LicencePlate, lv_DriverName);
          lv_url_fse = this._getOdataUrl("FSEInfo");
          this._performUpdateFSE(req, result_fse);
          messageString = this._getMessage(req, 'INTERFACE_CALLED_FSE');
          req.notify(messageString);

        } else {
          messageString = this._getMessage(req, 'INTERFACE_NOT_CALLED_FSE');
          req.error(400, messageString);
        }

        return;

      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "updateProcessData");
        return (error.message);

      }
    }



    this._updateProcessStatus = async function (req) {
      var ProcessId = req.params[0].ID;
      var messageString;
      var q1;
      try {

        q1 = await SELECT.from(Process).where`ID=${ProcessId}`;
        let lv_status = this._getProcessStatus(q1, req);
        if (lv_status.startsWith("20")) {
          messageString = this._getMessage(req, 'STATUS_IS_ALREADY_20');
          req.error(400, messageString);

        } else {
          await this._performUpdateStatus(req, '20 - Frei zur Einfahrt');
          messageString = this._getMessage(req, 'STATUS_SET_TO_20');
          req.notify(messageString);

        }


      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "updateProcessStatus");
        return (error.message);

      }
    }


    this._performUpdateStatus = async function (req, oStatus) {
      try {
        console.log("=====>>>>performUpdateStatus: To status " + oStatus);
        var ProcessId = req.params[0].ID;
        console.log("=====>>>>performUpdateStatus Process ID: " + ProcessId);
        await UPDATE.entity(Process, ProcessId)
          .set({ processStatusID_ID: oStatus });
        return;

      } catch (error) {
        // Handle errors during API call<
        console.log("=====>>>>performUpdateStatus ERROR " + ProcessId + " " + oStatus + " " + error.message);
        //     console.error(error.message);
        this._errorMessage(error.message, req, "performUpdateStatus");
        return (error.message);

      }
    }

    this._performUpdateFSE = async function (req, oData) {
      try {
        var ProcessId = req.params[0].ID;
        let date = new Date();
        let timeString = this._getTime();
        let messageString = this._getMessage(req, 'BTP_UPDATE_FSE') + date.toString() + " " + timeString;

        this._infoMessage(messageString, req, "performUpdateFSE");
        await UPDATE.entity(Process, ProcessId)
          .set({ FSEDate: oData.FSEDate, FSEAlternativeMenge: oData.FSEAlternativeMenge, FSETrockenGehalt: oData.FSETrockenGehalt, FSEAGewicht: oData.FSEAGewicht });
        return;

      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "performUpdateFSE");
        return (error.message);

      }
    }


    this._performUpdateScale = async function (req, oData, o_weigh) {
      try {
        let ProcessId = req.params[0].ID;
        // 

        let dateString = this._getDate();
        let date = new Date();
        let timeString = this._getTime();
        console.log("=====>>>>UPDATE SCALE Date - ddrmcap-service: >>>" + date);
        let messageString = this._getMessage(req, 'BTP_UPDATE_SCALE') + date.toString() + " " + timeString;
        this._infoMessage(messageString, req, "performUpdateScale");
        if (o_weigh == 1) {
          await UPDATE.entity(Process, ProcessId)
            .set({
              WaageNummer: o_weigh,
              WaageScheinNr: oData.WaageScheinNr,
              WaageScheinDate: date,
              //   WaageScheinTime: timeString,
              WaageScheinBruto: oData.WaageScheinBruto,
              WaageScheinNetto: oData.WaageScheinNetto,
              WaageScheinTara: oData.WaageScheinTara
            });
          req.data.WaageScheinNr = oData.WaageScheinNr;

          req.data.WaageScheinBruto = oData.WaageScheinBruto;
          req.data.WaageScheinNetto = oData.WaageScheinNetto;
          req.data.WaageScheinTara = oData.WaageScheinTara;
        }
        if (o_weigh == 2) {
          await UPDATE.entity(Process, ProcessId)
            .set({
              WaageNummer2: o_weigh,
              WaageScheinNr2: oData.WaageScheinNr,
              WaageScheinDate2: date,
              //   WaageScheinTime: timeString,
              WaageScheinBruto2: oData.WaageScheinBruto,
              WaageScheinNetto2: oData.WaageScheinNetto,
              WaageScheinTara2: oData.WaageScheinTara
            });
          req.data.WaageScheinNr2 = oData.WaageScheinNr;
          req.data.WaageScheinBruto2 = oData.WaageScheinBruto;
          req.data.WaageScheinNetto = oData.WaageScheinNetto;
          req.data.WaageScheinTara2 = oData.WaageScheinTara;
        }

        return;
      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "performUpdateScale");
        return (error.message);

      }
    }

    this._performInsertScale = function (req, oData) {
      try {
        const { ProcessWeighDocument } = cds.entities;
        let ProcessId = req.params[0].ID;
        console.log("=====>>>>INSERT SCALE SCHEINNR: >>>" + oData.WaageScheinNr + " " + ProcessId);
        // max ID

        var { maxID } = SELECT.one`max(WeighDocumentID) as maxID`.from(ProcessWeighDocument);
        if (!maxID) {
          maxID = 0;
        }
        const newWeighDocumentID = maxID + 1;
        console.log("=====>>>>INSERT SCALE SCHEINNR: MAX ID >>>" + newWeighDocumentID);
        let date = new Date();
        const { uuid } = cds.utils;
        let lv_id = uuid(); // generates a new UUID
        const { INSERT } = cds.ql;
        const NewWeighDocument = [
          {
            ID: lv_id,
            WeighDocumentID: newWeighDocumentID,
            WaageScheinNr: oData.WaageScheinNr,
            WaageScheinDate: date,
            WaageScheinBruto: oData.WaageScheinBruto,
            WaageScheinNetto: oData.WaageScheinNetto,
            WaageScheinTara: oData.WaageScheinTara,
            Process: ProcessId


          }
        ];

        console.log("=====>>>>BEFORE  INSERT SCALE SCHEINNR: ID >>>" + NewWeighDocument[0].ID);
        console.log("=====>>>>BEFORE  INSERT SCALE SCHEINNR: WeighDocumentID >>>" + NewWeighDocument[0].WeighDocumentID);
        console.log("=====>>>>BEFORE  INSERT SCALE SCHEINNR:  WaageScheinNr >>>" + NewWeighDocument[0].WaageScheinNr);
        console.log("=====>>>>BEFORE  INSERT SCALE SCHEINNR:  WaageScheinDate >>>" + NewWeighDocument[0].WaageScheinDate);
        console.log("=====>>>>BEFORE  INSERT SCALE SCHEINNR:  WaageScheinBruto >>>" + NewWeighDocument[0].WaageScheinBruto);
        console.log("=====>>>>BEFORE  INSERT SCALE SCHEINNR:  WaageScheinNetto >>>" + NewWeighDocument[0].WaageScheinNetto);
        console.log("=====>>>>BEFORE  INSERT SCALE SCHEINNR:  WaageScheinTara >>>" + NewWeighDocument[0].WaageScheinTara);

        console.log("=====>>>>BEFORE  INSERT SCALE SCHEINNR:  Process >>>" + NewWeighDocument[0].Process);

        const { result } = INSERT.into(ProcessWeighDocument).entries(NewWeighDocument);
        console.log("=====>>>>AFTER INSERT SCALE SCHEINNR: MAX ID >>>" + newWeighDocumentID);
        return;
      } catch (error) {
        // Handle errors during API call<
        console.error(error.message);
        this._errorMessage(error.message, req, "performInsertScale");
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
      //   console.log("=====>>>>diff >>>" + diff);
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

    this._getProcessStatus = function (oData, req) {
      try {

        //     console.log("=====>>>>getProcessStatus: >>>");
        let lv_ProcessStatusID = oData[0].processStatusID_ID;
        //      console.log("=====>>>>Status>>>" + lv_ProcessStatusID);
        return lv_ProcessStatusID;
      } catch (error) {
        // Handle errors during API call

        console.error(error.message);
        console.log("=====>>>>ERROR >>> getProcessStatus");
        this._errorMessage(error.message, req, "getProcessStatus");
        return (error.message);

      }
    }

    this._getProcessType = async function (oData, req) {
      try {
        const lv_ProcessTypeID = oData[0].processTypeID_ID;
        //      console.log("=====>>>>TYPE >>>" + lv_ProcessTypeID);

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

    this._warningMessage = function (eMessage, req, loc) {
      var messageString;
      console.error(eMessage);
      messageString = this._getMessage(req, 'BTP_WARNING') + " " + eMessage + "(" + loc + ")";
      req.notify(400, messageString);

    }

    this._infoMessage = function (eMessage, req, loc) {
      var messageString;
      console.error(eMessage);
      messageString = this._getMessage(req, 'INFO') + " " + eMessage;
      req.notify(400, messageString);

    }
    this._callAPI = async function (oURL, oLicencePlate, oDriverName) {
      try {
        const apiURL = oURL + '(LKW_Kennzeichen = \'' + oLicencePlate + '\', Fahrername = \'' + oDriverName + '\' )';
        //       console.log("=====>>>>API URL>>>" + apiURL);

        // temp
        const jsonReturn = {
          "WaageScheinNr": Math.floor(Math.random() * 1000000),

          "WaageScheinDate": new Date(),
          //      "WaageScheinTime": new Date().toLocaleTimeString(),
          "WaageScheinBruto": Math.floor(Math.random() * 10000),
          "WaageScheinNetto": Math.floor(Math.random() * 8000),
          "WaageScheinTara": Math.floor(Math.random() * 2000),
          "FSEDate": new Date(),
          "FSEAlternativeMenge": Math.floor(Math.random() * 500),
          "FSETrockenGehalt": Math.floor(Math.random() * 10),
          "FSEAGewicht": Math.floor(Math.random() * 400)
        };
        //    console.log("=====>>>>Date Call API >>>" + jsonReturn.WaageScheinDate);
        //  console.log("=====>>>>Time CALL API >>>" + jsonReturn.WaageScheinTime);


        //    console.log("=====>>>>FSA Menge >>>" + jsonReturn.FSEAlternativeMenge);
        return jsonReturn;
        const apiResponse = await axios.get(apiURL);
        return apiResponse;

        WaageScheinNr: Decimal;
        WaageScheinDate: DateTime;
        //     WaageScheinTime: Time;
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