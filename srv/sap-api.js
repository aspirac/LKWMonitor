

const cds = require('@sap/cds');
const { where } = require('@sap/cds/lib/ql/cds-ql');
const { results } = require('@sap/cds/lib/utils/cds-utils');

module.exports = async (srv) => {
     
    srv.on('READ', async (req) => {
        debugger;
        console.log("=====>>>>API SAP >>> BEFORE CONNECT READ 0001" );


        // handle connections

        // case 1. Sales orders

         var s4hanaFreightOrder = await cds.connect.to('sap_s4_OP_API_FREIGHTORDER_0001_v1');
         var s4hanaFreightBooking = await cds.connect.to('CE_FREIGHTBOOKING_0001');
         var s4hanaSales = await cds.connect.to('OP_API_SALES_ORDER_SRV_0001');
         var s4hanaInboundDelivery = await cds.connect.to('OP_API_INBOUND_DELIVERY_SRV_0002');
         var s4hanaOutboundDelivery = await cds.connect.to('OP_API_OUTBOUND_DELIVERY_SRV_0002');
         var s4hanaBusinessPartner = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV');
         var s4hanaPlant = await cds.connect.to('sap_s4_CE_PLANT_0001_v1');
    

        const objectType = req.target.name;
        var result;
        const {A_SalesOrder, A_SalesOrderItem} = s4hanaSales.entities;
        const {FreightOrder} = s4hanaFreightOrder.entities;
        const {FreightBooking} = s4hanaFreightBooking.entities;
        const {A_InbDeliveryHeader} = s4hanaInboundDelivery.entities;
        const {A_OutbDeliveryHeader} = s4hanaOutboundDelivery.entities;
        const {A_BusinessPartner} = s4hanaBusinessPartner.entities;
        const {A_BusinessPartnerAddress} = s4hanaBusinessPartner.entities;
        const {Plant} = s4hanaPlant.entities;
  
   
        console.log('Object type = ' + objectType);
         if (objectType.endsWith("SalesOrder") ){        
         //   results = await DDRMService._performUpdateSAPDocuments(req);
      //     result = await s4hanaSales.run(SELECT.from(A_SalesOrder).where({ OverallSDProcessStatus: { '!=': 'C' } }).columns('SalesOrder', 'SalesOrderType', 'SoldToParty', 'OverallSDProcessStatus'));
            result = await s4hanaSales.run(SELECT.from(A_SalesOrder).where({ OverallSDProcessStatus: { '!=': 'C' } }));
          }
          if(objectType.endsWith("SalesOrderItem")) {
          result = await s4hanaSales.run(SELECT.from(A_SalesOrderItem));
        } 
        else if (objectType.endsWith("FreightOrder")) {
            console.log("=====>>>>Freight >>>" );
           //  result  = await s4hanaFreightOrder.run(SELECT.from(FreightOrder).columns('FreightOrder', 'FreightOrderType', 'TranspOrdConsignee'));
             result  = await s4hanaFreightOrder.run(SELECT.from(FreightOrder));
        
        }
        else if (objectType.endsWith("FreightBooking")) {
            console.log("=====>>>>Freight Booking >>>" );
      // 
            result  = await s4hanaFreightBooking.run(SELECT.from(FreightBooking));
        }
        else if (objectType.endsWith("InboundDelivery")) {
            console.log("=====>>>>Inbound Delivery >>>" );
    //         result  = await s4hanaInboundDelivery.run(SELECT.from(A_InbDeliveryHeader).columns('DeliveryDocument', 'Supplier'));
            result  = await s4hanaInboundDelivery.run(SELECT.from(A_InbDeliveryHeader));
        }
        else if (objectType.endsWith("OutboundDelivery")) {
            console.log("=====>>>>Outbound Delivery >>>" );
            // result  = await s4hanaOutboundDelivery.run(SELECT.from(A_OutbDeliveryHeader).columns('DeliveryDocument', 'SoldToParty'));
            result  = await s4hanaOutboundDelivery.run(SELECT.from(A_OutbDeliveryHeader));
        }
        else if (objectType.endsWith("BusinessPartner")) {
            console.log("=====>>>>BusinessPartner >>>" );
             result  = await s4hanaBusinessPartner.run(SELECT.from(A_BusinessPartner).columns('BusinessPartner', 'BusinessPartnerName', 'Supplier'));
        }
       else if (objectType.endsWith("BusinessPartnerAddress")) {
            console.log("=====>>>> BusinessPartnerAddress >>>" );
             result  = await s4hanaBusinessPartner.run(SELECT.from(A_BusinessPartnerAddress).columns('BusinessPartner','FullName', 'StreetName','HouseNumber', 'PostalCode', 'Country'));
        }
       else if (objectType.endsWith("Plant")) {
            console.log("=====>>>> Plant >>>" );
             result  = await s4hanaPlant.run(SELECT.from(Plant));
        }
    
      //  console.log("=====>>>>result >>>" + result);
    
   //     return await salesOrderService.run(SELECT.from('API_SALES_ORDER_SRV.A_SalesOrder').limit(10));
   
    return result;
    });
};