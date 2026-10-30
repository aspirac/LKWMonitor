

const cds = require('@sap/cds');
const { results } = require('@sap/cds/lib/utils/cds-utils');

module.exports = async (srv) => {
     
    srv.on('READ', async (req) => {
        debugger;
        console.log("=====>>>>API SAP >>> BEFORE CONNECT READ 0001" );


        // handle connections

        // case 1. Sales orders

        var s4hanaSales = await cds.connect.to('OP_API_SALES_ORDER_SRV_0001');
        var s4hanaFreight = await cds.connect.to('sap_s4_OP_API_FREIGHTORDER_0001_v1');

        const objectType = req.target.name;
        var result;
        const {A_SalesOrder, A_SalesOrderItem} = s4hanaSales.entities;
        const {FreightOrder} = s4hanaFreight.entities;

         if (objectType.endsWith("SalesOrder") ){        
           result = await s4hanaSales.run(SELECT.from(A_SalesOrder).limit(50));
         }
        else  if(objectType.endsWith("SalesOrderItem")) {
          result = await s4hanaSales.run(SELECT.from(A_SalesOrderItem).limit(1));
        } 
        else if (objectType.endsWith("FreightOrder")) {
            console.log("=====>>>>Freight >>>" );
             result  = await s4hanaFreight.run(SELECT.from(FreightOrder).limit(1));
        }
    
        console.log("=====>>>>result >>>" + result);
    
   //     return await salesOrderService.run(SELECT.from('API_SALES_ORDER_SRV.A_SalesOrder').limit(10));
   
    return result;
    });
};