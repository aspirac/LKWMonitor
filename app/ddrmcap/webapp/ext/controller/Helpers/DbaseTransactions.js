sap.ui.define([
    "sap/m/MessageToast"


], function (MessageToast



) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */

   
        setPropertyValue:function (aContexts, property){
         
          aContexts[0].setProperty(property.property, property.value);
        },

        setValue: async function (oObject, obj, properties) {
            const oModel = oObject.oModel;
  

 // var oContext = oModel.getBindingContext();
  // let process = await SELECT `ID` .from `Process`
           
            for (const property of properties) {
                     
                let oBindList = oModel.bindList(property.entity);
              
                let aFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, obj.ID);
                try {
                             
                   oBindList.filter(aFilter).requestContexts().then(
                      function  (aContexts) {
                           aContexts[0].setProperty(property.property, property.value);
                           location.reload();
                        });
                } catch (error) {
                   
                }

            }
            //  oBindList.refresh();
        },
        setValueSingle: function (oObject, obj, property) {
            const oModel = oObject.oModel;
            let oBindList = oModel.bindList(property.entity);
            let aFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, obj.ID);
            try {
           
                oBindList.filter(aFilter).requestContexts().then(
                  
                     setPropertyValue(aContexts, property));
                
              //      function (aContexts) {
              //          aContexts[0].setProperty(, .property, property.value);
                //    });
              
            } catch (error) {

            }


            //  oBindList.refresh();
        },
        displayMsg: function (msg) {
            MessageToast.show(msg);

        }
    };
});
