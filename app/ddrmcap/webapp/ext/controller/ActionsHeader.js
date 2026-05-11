


sap.ui.define([
    "sap/m/MessageToast",
    "./Helpers/ActionUtils"
], function(MessageToast, ActionUtils) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        onSetStatus20: function(oContext, aSelectedContexts) {
 
            var sMsg;
            aSelectedContexts.forEach((oObject, index) => {
            const obj = oObject.getObject();
            ActionUtils.setStatus(oObject,obj ,'20');
            location.reload(); 

            });
        }
    };
});
