/* checksum : 9636b0f9d3932cc786f08757f870afff */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZAG_I_SALESORDER2_CDS1 {
  @cds.external : true
  @cds.persistence.skip : true
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.deletable : 'false'
  @sap.content.version : '1'
  @sap.label : 'Test OData'
  entity ZAG_I_SALESORDER2 {
    @sap.display.format : 'UpperCase'
    @sap.label : 'Sales Order'
    key SalesOrderID : String(10) not null;
    @sap.display.format : 'NonNegative'
    @sap.label : 'Item'
    @sap.quickinfo : 'Sales Order Item'
    SalesOrderItem : String(6);
    @sap.display.format : 'UpperCase'
    @sap.label : 'Created By'
    @sap.quickinfo : 'Name of Person Responsible for Creating the Object'
    CreatedByUser : String(12);
    @sap.display.format : 'Date'
    @sap.label : 'Changed On'
    @sap.quickinfo : 'Last Changed On'
    LastChangedDate : Date;
  };
};

