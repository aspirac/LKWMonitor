namespace com.jrs.lkwvor;

using {managed} from '@sap/cds/common';

entity Process : managed {

    key ID                    : UUID                  @(Core.Computed: true);
   
  //      to_InsolvencyMeasures : Composition of many InsolvencyMeasures
    //                                on to_InsolvencyMeasures.Exception = $self;
    //    to_CrisisMeasures     : Composition of many CrisisMeasures
    //                               on to_CrisisMeasures.Exception = $self; https://api.cf.us10-001.hana.ondemand.com/
        
        processTypeID : Association to ProcessType;
        processStatusID : Association to ProcessStatus;
        LKW_Kennzeichen : String(20);
        Trailer_Kennzeichen : String(20);
        Fahrername: String(20);
        Frachtfuehrername : String(20);
        Containernummer_1 : String(20);
        Containernummer_2 : String(20);
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
   //     to_ProcessSAPDocumentIn : Composition of ProcessSAPDocumentIn
   //                               on to_ProcessSAPDocumentIn.Process = $self;
   //     to_ProcessSAPDocumentOut  : Composition of many ProcessSAPDocumentOut
   //                               on to_ProcessSAPDocumentOut.Process = $self;
    
 
}






entity ProcessStatus : managed {
    key ID          :  String(2);                 
     description : String(100);
     Process  : Association to many Process
                          on Process.processStatusID = $self;

} 
       
entity ProcessType : managed {
   
    key ID          : String(2);
        description : String(100);
        Process  : Association to many Process
                          on Process.processTypeID = $self;
}

entity ProcessSAPDocumentIn : managed {
   
    key ID : UUID @(Core.Computed: true);
    DocNumber          : Association to SAPDocument;
  //  DocType            : String(10);
  //  Description: String(30);
  //  Customer: String(30);    
    Process               : Association to Process
}

entity ProcessSAPDocumentOut : managed { 
    key ID : UUID @(Core.Computed: true);
    DocNumber          : Association to SAPDocument;
    //DocType            : String(10);
    //Description: String(30);
    //Customer: String(30);    
    Process               : Association to Process
}
entity SAPDocument : managed {
   
    key DocNumber          : String(30);
    DocType            : String(10);
    description: String(60);
    CustomerNumber: String(10);    
    CustomerName: String(100);    

}




