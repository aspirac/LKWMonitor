using {com.jrs.lkwvor as db} from '../db/schema';


@path: 'service/ddrm'

service DDRMService @(requires: 'authenticated-user') {

  @odata.draft.enabled
  @odata.draft.bypass
 
  entity Process as projection on db.Process actions{
    action setStatus20();
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
  entity ProcessSAPDocumentIn              as projection on db.ProcessSAPDocumentIn;
  entity ProcessSAPDocumentOut              as projection on db.ProcessSAPDocumentOut;
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
