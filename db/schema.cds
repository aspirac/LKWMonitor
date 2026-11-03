namespace com.jrs.lkwvor;

using {managed} from '@sap/cds/common';

// using {Attachments} from '@cap-js/attachments';

entity Process : managed {

    key ID                       : UUID        @(Core.Computed: true);
        processID                : Integer     @Core.Computed;
        processTypeID            : Association to ProcessType;
        processStatusID          : Association to ProcessStatus;
        LKW_Kennzeichen          : String(20);
        Trailer_Kennzeichen      : String(20);
        Fahrername               : String(20);
        Frachtfuehrername        : String(20);
        Containernummer_1        : String(20);
        Siegelnummer             : String(20);
        Bemerkung_1              : LargeString;
        Bemerkung_2              : LargeString;
        WaageNummer              : Integer;
        WaageScheinNr            : Decimal;
        WaageScheinDate          : DateTime;
        //     WaageScheinTime:Time;
        WaageScheinBruto         : Decimal;
        WaageScheinNetto         : Decimal;
        WaageScheinTara          : Decimal;
        WaageNummer2             : Integer;
        WaageScheinNr2           : Decimal;
        WaageScheinDate2         : DateTime;
        //     WaageScheinTime:Time;
        WaageScheinBruto2        : Decimal;
        WaageScheinNetto2        : Decimal;
        WaageScheinTara2         : Decimal;
        FSEDate                  : DateTime;
        FSEAlternativeMenge      : Decimal;
        FSETrockenGehalt         : Decimal;
        FSEAGewicht              : Decimal;
        fileName                 : String;
        fileType                 : String      @Core.IsMediaType;
        content                  : LargeBinary @Core.MediaType                  : fileType
                                               @Core.ContentDisposition.Filename: fileName;

        to_ProcessSAPDocumentOut : Composition of many ProcessSAPDocumentOut
                                       on to_ProcessSAPDocumentOut.Process = $self;
        to_ProcessSAPDocumentIn  : Composition of many ProcessSAPDocumentIn
                                       on to_ProcessSAPDocumentIn.Process = $self;

        to_ProcessWeighDocument  : Composition of many ProcessWeighDocument
                                       on to_ProcessWeighDocument.Process = $self;


        to_ProcessFSADocument    : Composition of many ProcessFSADocument
                                       on to_ProcessFSADocument.Process = $self;

        to_ProcessAttachments    : Composition of many ProcessAttachments
                                       on to_ProcessAttachments.Process = $self;

//      attachment               : Composition of many Attachments


}


entity ProcessStatus : managed {
    key ID             : String(100);
        description    : String(100);
        description_ID : String(2);
        Process        : Association to many Process
                             on Process.processStatusID = $self;

}

entity ProcessType : managed {

    key ID             : String(100);
        description    : String(100);
        description_ID : String(2);
        Process        : Association to many Process
                             on Process.processTypeID = $self;
}


entity ProcessSAPDocumentOut : managed {
    key ID               : UUID    @(Core.Computed: true);
        sapDocumentOutID : Integer @Core.Computed;
        to_SapDocument   : Association to SAPDocument;
        //   DocNumber          : String(20);
        Process          : Association to Process
}

entity ProcessSAPDocumentIn : managed {
    key ID              : UUID    @(Core.Computed: true);
        sapDocumentInID : Integer @Core.Computed;
        to_SapDocument  : Association to SAPDocument;
        //   DocNumber          : String(30);
        Process         : Association to Process
}

entity ProcessAttachments : managed {
    key ID       : UUID        @(Core.Computed: true);
        Title    : String(100);
        fileName : String;
        fileType : String      @Core.IsMediaType;
        content  : LargeBinary @Core.MediaType                  : fileType
                               @Core.ContentDisposition.Filename: fileName;
        Process  : Association to Process
}

entity SAPDocumentKindType : managed {

    key ID            : String(30);
        description   : String(100);
        descriptionDE : String(100);
//       SAPDocument        : Association to many SAPDocument
//                            on SAPDocument.DocumentKindCode = $self;

}

entity SAPDocument : managed {
        //    key MANDT: String(5);
    key DocNumber                 : String(30);
        DocType                   : String(5);
        DocTypeDesc               : String(50);
        DocumentKindCode          : String(30);
        DocumentKindDescriptionDE : String(30);
        DocumentKindDescription   : String(30);
    //    description               : String(60);
        CustomerNumber            : String(20);
  //      CustomerName              : String(100);
        ProcessSapDocumentIn      : Association to many ProcessSAPDocumentIn
                                        on ProcessSapDocumentIn.to_SapDocument = $self;


}

entity SAPDocumentType : managed {

    key DocType     : String(10);
        description : String(60);
//   to_SAPDocument : Association to many SAPDocument on
//                    to_SAPDocument.DocType = $self;

}

entity ProcessWeighDocument : managed {
    key ID               : UUID    @(Core.Computed: true);
        WeighDocumentID  : Integer @Core.Computed;
        WaageScheinNr    : Decimal;
        WaageScheinDate  : DateTime;
        WaageScheinBruto : Decimal;
        WaageScheinNetto : Decimal;
        WaageScheinTara  : Decimal;
        Process          : Association to Process;
}


entity ProcessFSADocument : managed {
    key ID                  : UUID    @(Core.Computed: true);
        FSADocumentID       : Integer @Core.Computed;
        FSEAlternativeMenge : Decimal;
        FSETrockenGehalt    : Decimal;
        FSEAGewicht         : Decimal;
        Process             : Association to Process;
}

entity SalesOrder : managed {
    key SalesOrder           : Integer;
        SalesOrderType       : String(10);
        SalesOrganization    : String(10);
        DistributionChannel  : String(10);
        OrganizationDivision : String(10);
        SalesGroup           : String(10);
        SalesOffice          : String(10);
        SalesDistrict        : String(10);
        SoldToParty          : String(30);
        CreationDate         : Date;
        CreatedByUser        : String(30);
        SalesOrderDate       : Date;
}

type SalesOrderType {
    SalesOrder           : Integer;
    SalesOrderType       : String(10);
    SalesOrganization    : String(10);
    DistributionChannel  : String(10);
    OrganizationDivision : String(10);
    SalesGroup           : String(10);
    SalesOffice          : String(10);
    SalesDistrict        : String(10);
    SoldToParty          : String(30);
    CreationDate         : Date;
    CreatedByUser        : String(30);
    SalesOrderDate       : Date;
}

entity InboundDelivery {
    key DeliveryDocument               : String(30);
        ReceivingLocationTimeZone      : String(10);
        ActualDeliveryRoute            : String(30);
        ActualGoodsMovementDate        : Date;
        ActualGoodsMovementTime        : Time;
        BillingDocumentDate            : DateTime;
        BillOfLading                   : String(30);
        CompleteDeliveryIsDefined      : Boolean;
        ConfirmationTime               : Time;
        CreatedByUser                  : String(30);
        CreationDate                   : DateTime;
        CreationTime                   : Time;
        CustomerGroup                  : String(30);
        DeliveryBlockReason            : String(30);
        DeliveryDate                   : DateTime;
        DeliveryDocumentBySupplier     : String(100);
        DeliveryDocumentType           : String(100);
        DeliveryIsInPlant              : Boolean;
        DeliveryPriority               : String(30);
        DeliveryTime                   : Time;
        DeliveryVersion                : String(30);
        DepreciationPercentage         : Decimal;
        DistrStatusByDecentralizedWrhs : String(30);
        DocumentDate                   : DateTime;
        ExternalIdentificationType     : String(30);
        ExternalTransportSystem        : String(30);
        FactoryCalendarByCustomer      : String(30);
        Supplier                       : String(30);

}

entity OutboundDelivery {
    key DeliveryDocument               : String(30);
        ShipingLocationTimeZone        : String(10);
        ActualDeliveryRoute            : String(30);
        ActualGoodsMovementDate        : Date;
        ReceivingLocationTimeZone      : String(10);
        ActualGoodsMovementTime        : Time;
        BillingDocumentDate            : DateTime;
        BillOfLading                   : String(30);
        CompleteDeliveryIsDefined      : Boolean;
        ConfirmationTime               : Time;
        CreatedByUser                  : String(30);
        CreationDate                   : DateTime;
        CreationTime                   : Time;
        CustomerGroup                  : String(30);
        DeliveryBlockReason            : String(30);
        DeliveryDate                   : DateTime;
        DeliveryDocumentBySupplier     : String(100);
        DeliveryDocumentType           : String(100);
        DeliveryIsInPlant              : Boolean;
        DeliveryPriority               : String(30);
        DeliveryTime                   : Time;
        DeliveryVersion                : String(30);
        DepreciationPercentage         : Decimal;
        DistrStatusByDecentralizedWrhs : String(30);
        DocumentDate                   : DateTime;
        ExternalIdentificationType     : String(30);
        ExternalTransportSystem        : String(30);
        FactoryCalendarByCustomer      : String(30);
        SoldToParty                    : String(30);
}

entity FreightOrder {
    key DeliveryDocument : String(30);
}

entity FreightBooking {
    key DeliveryDocument : String(30);
}

entity BusinessPartner {
    key BPID     : String(20);
        Supplier : String(20);
        Name     : String(40);
}
