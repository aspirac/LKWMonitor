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
    callInterfaceScale: function (oLicencePlate) {
      try {
        var date = new Date("04/20/2026 00:00:00");
        var milliseconds = date.getTime();
        var wdate = '/Date(' + milliseconds + ')/';
        let result = [

          {
            entity: "/Process",
            property: "WaageScheinNr",
            value: 100004
          },
          {
            entity: "/Process",
            property: "WaageScheinDate",
            value: "2012-04-26T13:36:00"
          },
          {
            entity: "/Process",
            property: "WaageScheinTime",
            value: "15:36:05"
          },
          {
            entity: "/Process",
            property: "WaageScheinBruto",
            value: 12000
          },
          {
            entity: "/Process",
            property: "WaageScheinNetto",
            value: 9000
          },
          {
            entity: "/Process",
            property: "WaageScheinTara",
            value: 1000
          }

        ];
        return result;
      } catch (error) {

      }
      //  oBindList.refresh();
    },

    callInterfaceFSE: function (oLicencePlate) {

      let result = [

        {
          entity: "/Process",
          property: "FSEAlternativeMenge",
          value: 100004
        },
        {
          entity: "/Process",
          property: "FSETrockenGehalt",
          value: 10003
        },
        {
          entity: "/Process",
          property: "FSEAGewicht",
          value: 100001
        },

      ];
      return result;

    },
    displayMsg: function (msg) {
      MessageToast.show(msg);

    }
  };
});

 