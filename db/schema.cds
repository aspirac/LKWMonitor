namespace com.jrs.lkwvor;

using {managed} from '@sap/cds/common';

entity Process : managed {

    key ID                    : UUID                  @(Core.Computed: true);
        processID : Integer  @Core.Computed;
        processTypeID : Association to ProcessType;
        processStatusID : Association to ProcessStatus;
        LKW_Kennzeichen : String(20);
        Trailer_Kennzeichen : String(20);
        Fahrername: String(20);
        Frachtfuehrername : String(20);
        Containernummer_1 : String(20);
        Siegelnummer : String(20);
        Bemerkung_1 : LargeString;
        Bemerkung_2 : LargeString;
        WaageScheinNr: Decimal;
        WaageScheinDate: DateTime;
        WaageScheinTime:Time;
        WaageScheinBruto:Decimal;
        WaageScheinNetto:Decimal;
        WaageScheinTara:Decimal;
        FSEAlternativeMenge:Decimal;
        FSETrockenGehalt:Decimal;
        FSEAGewicht:Decimal;
        to_ProcessSAPDocumentIn : Composition of ProcessSAPDocumentIn
                                  on to_ProcessSAPDocumentIn.Process = $self;
        to_ProcessSAPDocumentOut  : Composition of many ProcessSAPDocumentOut
                                  on to_ProcessSAPDocumentOut.Process = $self;
    
 
}






entity ProcessStatus : managed {
    key ID          :  String(100);                 
     description : String(100);
     description_ID : String(2);
     Process  : Association to many Process
                          on Process.processStatusID = $self;

} 
       
entity ProcessType : managed {
   
    key ID          : String(100);
        description : String(100);
        description_ID : String(2);
        Process  : Association to many Process
                          on Process.processTypeID = $self;
}

entity ProcessSAPDocumentIn : managed {
   
    key ID : UUID @(Core.Computed: true);
    sapDocumentInID : Integer  @Core.Computed;
    DocNumber          : Association to SAPDocument;
    Process             : Association to Process
}

entity ProcessSAPDocumentOut : managed { 
    key ID : UUID @(Core.Computed: true);
    DocNumber          : Association to SAPDocument;
    Process             : Association to Process
}
entity SAPDocument : managed {
   
    key DocNumber          : String(30);
    description: String(60);
    CustomerNumber: String(10);    
    CustomerName: String(100);    
    DocType            : Association to SAPDocumentType

}
entity SAPDocumentType : managed {
   
    key DocType         : String(4);
    description: String(60);
    to_SAPDocument : Association to many SAPDocument on
                     to_SAPDocument.DocType = $self;

}

entity SAPClient: managed {
key  MANDT: String(3);
     BUKRS: String(3)
}


