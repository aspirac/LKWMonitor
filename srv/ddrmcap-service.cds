using {com.jrs.lkwvor as db} from '../db/schema';


@path: 'service/ddrm'

service DDRMService @(requires: 'authenticated-user') {
    type Result : {
        message : String;
        id      : Integer;
        param1  : String;
        param2  : String;
    };

    @odata.draft.enabled
    //@odata.draft.bypass

    entity Process               as projection on db.Process
        actions {

            action setSStatus20();
            @(Common.SideEffects: {TargetProperties: [
                'WaageNummer',
                'WaageScheinNr',
                'WaageScheinDate',
                'WaageScheinBruto',
                'WaageScheinNetto',
                'WaageScheinTara',
                'WaageNummer2',
                'WaageScheinNr2',
                'WaageScheinDate2',
                'WaageScheinBruto2',
                'WaageScheinNetto2',
                'WaageScheinTara2'
            ],

            })
            action callInterfaceScale() returns Result;
            @(Common.ects: {TargetProperties: [
                'FSEDate',
                'FSEAlternativeMenge',
                'FSETrockenGehalt',
                'FSEAGewicht'
            ],

            })
            action callInterfaceFSE()   returns Result;

            @(Common.SideEffects #StatusChanged: {TargetProperties: [
                'processStatusID_ID',
                'processStatusID.description'
            ],
 })
            action callSetStatus20()    returns Result;
        };

    // entity Process as projection on db.Process {
    //   *,




    entity ProcessStatus         as projection on db.ProcessStatus;
    entity ProcessType           as projection on db.ProcessType;
    entity SAPDocument           as projection on db.SAPDocument;

    entity ProcessSAPDocumentOut as projection on db.ProcessSAPDocumentOut;
    entity ProcessSAPDocumentIn  as projection on db.ProcessSAPDocumentIn;
    entity ProcessWeighDocument  as projection on db.ProcessWeighDocument;
    entity ProcessFSADocument    as projection on db.ProcessFSADocument;
    entity ProcessAttachments    as projection on db.ProcessAttachments;


//entity MediaFile                 as projection on db.MediaFile;
}

entity LKWMonitorInfo {
    key id                                : String;
        name                              : String;
        is_potentially_hazardous_asteroid : Boolean;
        nasa_jpl_url                      : String;
        kilometers_per_hour               : String;
};

type APIInfo {

    WaageScheinNr       : Decimal;
    WaageScheinDate     : Date;
    //      WaageScheinTime:Time;
    WaageScheinBruto    : Decimal;
    WaageScheinNetto    : Decimal;
    WaageScheinTara     : Decimal;
    FSEAlternativeMenge : Decimal;
    FSETrockenGehalt    : Decimal;
    FSEAGewicht         : Decimal;

}

annotate db.Process with {
    processTypeID @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'ProcessType',

        Parameters    : [{
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


