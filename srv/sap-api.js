

const cds = require('@sap/cds');

module.exports = async (srv) => {
 

    
    srv.on('READ', 'SalesOrder', async (req) => {
        debugger;
    console.log("=====>>>>API_SALES_ORDER_SRV>>> BEFORE CONNECT" );
  const s4hana = await cds.connect.to('API_SALES_ORDER_SRV');
    
         
    const { A_SalesOrder } = s4hana.entities;
    console.log("=====>>>>API_SALES_ORDER_SRV>>>" + s4hana);
        // Call the OP_API_SALES_ORDER_SRV_0001 service using CQN
         // return await order.run(SELECT.from(SalesOrder).limit(10));
          return await s4hana.run(SELECT.from(A_SalesOrder).limit(10));
   //     return await salesOrderService.run(SELECT.from('API_SALES_ORDER_SRV.A_SalesOrder').limit(10));
    });
};