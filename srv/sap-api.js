const cds = require('@sap/cds');
module.exports = cds.service.impl(async function (srv) {

    const { SalesOrder } = this.entities;

    // connects to the remote service
    const order = await cds.connect.to('API_SALES_ORDER_SRV');

    // Handle GET call
    srv.on('READ', 'SalesOrder', async req => {

    const order = await cds.connect.to('API_SALES_ORDER_SRV');
        return order.run(req.query);
        
    });

    


});