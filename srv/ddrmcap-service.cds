using {com.jrs.lkwvor as db} from '../db/schema';


@path: 'service/ddrm'

service DDRMService @(requires: 'authenticated-user') {
    type Result: {
        message: String;
        id: Integer;
        param1: String;
        param2: String;
    };
  @odata.draft.enabled
  //@odata.draft.bypass
 
  entity Process as projection on db.Process actions{
    action setSStatus20();
    action callInterfaceScale() returns Result;
    action callSetStatus20() returns Result;
     };

 // entity Process as projection on db.Process {
 //   *,
  

    // ***Process Type ID***
 //    processTypeID.description                                    as ProcessTypeDescription,
  //  @Common.Text:  ProcessTypeDescription
 //   processTypeID,
    // ***Process Status ID***
  //   processStatusID.description                                   as ProcessStatusDescription,
 //   @Common.Text:  ProcessStatusDescription
  //  processStatusID,

 // } actions {
   
//     action setStatus20();
   
// };

  entity ProcessStatus             as projection on db.ProcessStatus;
  entity ProcessType               as projection on db.ProcessType;
  entity SAPDocument               as projection on db.SAPDocument;
 
  entity ProcessSAPDocumentOut              as projection on db.ProcessSAPDocumentOut;
  entity ProcessSAPDocumentIn              as projection on db.ProcessSAPDocumentIn;
  entity  ProcessWeighDocument              as projection on db.ProcessWeighDocument;
  entity  ProcessFSADocument              as projection on db.ProcessFSADocument;
    
  
  //entity MediaFile                 as projection on db.MediaFile;
}
  entity LKWMonitorInfo{
        key id                                : String;
            name                              : String;
            is_potentially_hazardous_asteroid : Boolean;
            nasa_jpl_url                      : String;
            kilometers_per_hour               : String;
    };

type APIInfo  {
    
        WaageScheinNr: Decimal;
        WaageScheinDate: Date;
  //      WaageScheinTime:Time;
        WaageScheinBruto:Decimal;
        WaageScheinNetto:Decimal;
        WaageScheinTara:Decimal;
        FSEAlternativeMenge:Decimal;
        FSETrockenGehalt:Decimal;
        FSEAGewicht:Decimal;
 
}

Annotate db.Process with {
    processTypeID @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'ProcessType',
     
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: processTypeID_ID,
                ValueListProperty: 'ID',
            }
 //           {
 //               $Type            : 'Common.ValueListParameterDisplayOnly',
 //               ValueListProperty: 'description',
 //           },
        ],
    }
      
};


annotate db.Process @(Common : {
    SideEffects #WaageChanged  : {
        SourceProperties : ['WaageScheinDate'],
        TargetProperties : ['WaageScheinDate', 'WaageScheinBruto', 'WaageScheinNetto', 'WaageScheinTara'],
    }
});

annotate db.Process @(Common : {
    SideEffects #FSEChanged  : {
        SourceProperties : ['FSEAlternativeMenge'],
        TargetProperties : ['FSEAlternativeMenge', 'FSETrockenGehalt', 'FSEAGewicht'],
    }
});