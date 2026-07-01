namespace com.jrs.lkwvor;

using {managed} from '@sap/cds/common';
using {Attachments} from '@cap-js/attachments';

entity Process : managed {

    key ID                       : UUID    @(Core.Computed: true);
        processID                : Integer @Core.Computed;
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
        WaageNummer                : Integer;
        WaageScheinNr            : Decimal;
        WaageScheinDate          : DateTime;
        //     WaageScheinTime:Time;
        WaageScheinBruto         : Decimal;
        WaageScheinNetto         : Decimal;
        WaageScheinTara          : Decimal;
        WaageNummer2               : Integer;
        WaageScheinNr2            : Decimal;
        WaageScheinDate2          : DateTime;
        //     WaageScheinTime:Time;
        WaageScheinBruto2         : Decimal;
        WaageScheinNetto2         : Decimal;
        WaageScheinTara2          : Decimal;
        FSEDate          : DateTime;
        FSEAlternativeMenge      : Decimal;
        FSETrockenGehalt         : Decimal;
        FSEAGewicht              : Decimal;

        to_ProcessSAPDocumentOut : Composition of many ProcessSAPDocumentOut
                                       on to_ProcessSAPDocumentOut.Process = $self;
        to_ProcessSAPDocumentIn  : Composition of many ProcessSAPDocumentIn
                                       on to_ProcessSAPDocumentIn.Process = $self;

        to_ProcessWeighDocument  : Composition of many ProcessWeighDocument
                                      on to_ProcessWeighDocument.Process = $self;


        to_ProcessFSADocument    : Composition of many ProcessFSADocument
                                       on to_ProcessFSADocument.Process = $self;


        attachment               : Composition of many Attachments


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

entity SAPDocument : managed {
        //    key MANDT: String(5);
    key DocNumber            : String(30);
        DocType              : String(5);
        DocTypeDesc          : String(50);
        description          : String(60);
        CustomerNumber       : String(20);
        CustomerName         : String(100);
        ProcessSapDocumentIn : Association to many ProcessSAPDocumentIn
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