using {com.jrs.lkwvor as db} from '../db/schema';


@path: 'service/ddrm'

service DDRMService @(requires: 'authenticated-user') {

  @odata.draft.enabled
  @odata.draft.bypass
 
  entity Process as projection on db.Process actions{
    action setStatus20();
  };

  entity ProcessStatus             as projection on db.ProcessStatus;
  entity ProcessType               as projection on db.ProcessType;
  entity SAPDocument               as projection on db.SAPDocument;
  entity ProcessSAPDocumentIn              as projection on db.ProcessSAPDocumentIn;
  entity ProcessSAPDocumentOut              as projection on db.ProcessSAPDocumentOut;
}

