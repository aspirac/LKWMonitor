
using DDRMService as service from '../../srv/ddrmcap-service';




annotate service.Process with @(

 Common : {
    SideEffects #ProcessStatusChanged : {
        SourceProperties : ['processStatusID_ID'],
        TargetEntities   : [ProcessStatus, ProcessStatus.description]
    }
},

   
    Analytics.AggregatedProperty #ProcessID_countdistinct : {
        $Type : 'Analytics.AggregatedPropertyType',
        Name : 'ProcessID_countdistinct',
        AggregatableProperty : ProcessID,
        AggregationMethod : 'countdistinct',
        ![@Common.Label] : '{i18n>Processes}',
    },
    
    UI.Chart #alpChart : {
        $Type : 'UI.ChartDefinitionType',
        ChartType : #Column,
        Dimensions : [
            processStatusID,
        ],
        DynamicMeasures : [
            '@Analytics.AggregatedProperty#ProcessID_countdistinct',
        ],
        Title : '{i18n>TravelsByCustomerCountry}',
    },

    UI.SelectionFields                    : [
        processTypeID_ID,
        processStatusID_ID,
        LKW_Kennzeichen,
        Fahrername,
      //   Frachtfuehrername,
      //  Containernummer_1,
      //  Containernummer_2,
    ],

    UI.Identification        : [
        // Object Page
                  {
            $Type : 'UI.DataFieldForAction',
            Action: 'DDRMService.callSetStatus20',  
            Label :  '{@i18n>setStatus20}',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'DDRMService.callInterfaceScale',  
            Label :  '{@i18n>callinterfaceWAAGE}',
        },
       {
            $Type : 'UI.DataFieldForAction',
            Action: 'DDRMService.callInterfaceFSE',  
            Label :  '{@i18n>callinterfaceFSE}',
        },
 
    ],

    UI.LineItem                           : [

      {
            $Type : 'UI.DataFieldForAction',
            Action: 'DDRMService.callInterfaceScale',  
            Label :  '{@i18n>callinterfaceWAAGE}',
        },
         {
            $Type : 'UI.DataFieldForAction',
            Action: 'DDRMService.callInterfaceFSE',  
            Label :  '{@i18n>callinterfaceFSE}',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'DDRMService.callSetStatus20',  
            Label :  '{@i18n>setStatus20}',
        },
        {
            $Type: 'UI.DataField',
            Value: processTypeID.description_ID,
            Label: '{@i18n>processType}',
        },

        {
            $Type: 'UI.DataField',
            Value: processTypeID.description,
            Label: '{@i18n>ProcessTypeDescription}',
        },
 
        {
            $Type: 'UI.DataField',
            Value: processStatusID.description_ID,
            Label: '{@i18n>processStatus}',
        },
 
     {
            $Type: 'UI.DataField',
            Value: processStatusID.description,
            Label: '{@i18n>ProcessStatusDescription}',
        },
     {
            $Type: 'UI.DataField',
            Value: processID,
          
            Updatable: false,
            Label: '{@i18n>processID}',
        },
      {
            $Type: 'UI.DataField',
            Value: LKW_Kennzeichen,
            Label: '{@i18n>LKWKennzeichen}',
        },
      {
            $Type: 'UI.DataField',
            Value: Trailer_Kennzeichen,
            Label: '{@i18n>TrailerKennzeichen}',
        },
   
    
        {
            $Type: 'UI.DataField',
            Value: Fahrername,
            Label: '{@i18n>Fahrername}',
        },
      
       {
            $Type: 'UI.DataField',
            Value: Frachtfuehrername,
            Label: '{@i18n>Frachtfuehrername}',
        },
 
      {
            $Type: 'UI.DataField',
            Value: Containernummer_1,
            Label: '{@i18n>Containernummer_1}',
        },
   {
            $Type: 'UI.DataField',
            Value: Siegelnummer,
            Label: '{@i18n>Siegelnummer}',
        },
 
     {
            $Type: 'UI.DataField',
            Value: Bemerkung_1,
            Label: '{@i18n>Bemerkung_1}',
        },

 {
            $Type: 'UI.DataField',
            Value: Bemerkung_2,
            Label: '{@i18n>Bemerkung_2}',
        },

    
    ],
    // UI.SelectionPresentationVariant #tableView : {
    //     $Type              : 'UI.SelectionPresentationVariantType',
    //     PresentationVariant: {
    //         $Type         : 'UI.PresentationVariantType',
    //         Visualizations: ['@UI.LineItem',
    //         ],
    //     },
    //     SelectionVariant   : {
    //         $Type        : 'UI.SelectionVariantType',
    //         SelectOptions: [],
    //     },
    //     Text               : 'Table View',
    // },

    // UI.LineItem #tableView                     : [],
    // UI.SelectionPresentationVariant #tableView1: {
    //     $Type              : 'UI.SelectionPresentationVariantType',
    //     PresentationVariant: {
    //         $Type         : 'UI.PresentationVariantType',
    //         Visualizations: ['@UI.LineItem#tableView',
    //         ],
    //     },
    //     SelectionVariant   : {
    //         $Type        : 'UI.SelectionVariantType',
    //         SelectOptions: [],
    //     },
    //     Text               : 'Table View 1',
    // },

    //To allow updatable on child "InsolvencyMeasures" entity

    //To allow updatable on child "SapDocumentIn" entity
 //   Capabilities                          : {NavigationRestrictions: {RestrictedProperties: [
 //       {
 //           NavigationProperty: to_ProcessSAPDocumentIn,
 //           UpdateRestrictions: {Updatable: true}
//        },
//      {
//            NavigationProperty: to_ProcessSAPDocumentOut,
//            UpdateRestrictions: {Updatable: true}
//        },

//        {
//            NavigationProperty: to_CrisisMeasures,
//            UpdateRestrictions: {Updatable: true}
//        },
 //   ]}, },


    UI.FieldGroup #CreateGroup            : {
        $Type: 'UI.FieldGroupType',
        Data : [
      
            {
                $Type: 'UI.DataField',
                Value: processTypeID_ID
                  },

           {
                $Type: 'UI.DataField',
                Value: processTypeID.description,
                
            }, 
          {
                $Type: 'UI.DataField',
                Value: processID,
                     Updatable: false,
                Label: '{@i18n>processID}',
                
            }, 

        ],
    },

    UI.FieldGroup #CommonGroup            : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: processStatusID_ID
            },
          {
                $Type: 'UI.DataField',
                Value: processStatusID.description,
                
            }, 

        ],
    },

      UI.FieldGroup #LKWGroup            : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: LKW_Kennzeichen
            },
            {
                $Type: 'UI.DataField',
                Value: Trailer_Kennzeichen ,
            },
          {
                $Type: 'UI.DataField',
                Value: Fahrername ,
            },
           {
                $Type: 'UI.DataField',
                Value: Frachtfuehrername ,
            },
         {
                $Type: 'UI.DataField',
                Value: Containernummer_1 ,
            },
          
         {
                $Type: 'UI.DataField',
                Value: Siegelnummer ,
            },
                 {
                $Type: 'UI.DataField',
                Value: Bemerkung_1 ,
            },
           {
                $Type: 'UI.DataField',
                Value: Bemerkung_2 ,
            },
    


        ],
    },

     UI.FieldGroup #WaageGroup           : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: WaageNummer,
            },
          {
                $Type: 'UI.DataField',
                Value: WaageScheinNr,
            },
            {
                $Type: 'UI.DataField',
                Value: WaageScheinDate,
            },
 //         {
 //               $Type: 'UI.DataField',
 //              Value: WaageScheinTime ,
 //               visible: false,
 //           },
           {
                $Type: 'UI.DataField',
                Value: WaageScheinBruto ,
            },
         {
                $Type: 'UI.DataField',
                Value: WaageScheinNetto ,
            },
          
         {
                $Type: 'UI.DataField',
                Value: WaageScheinTara,
            },
           
        ],
    },

   UI.FieldGroup #WaageGroup2           : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: WaageNummer2,
            },
          {
                $Type: 'UI.DataField',
                Value: WaageScheinNr2,
            },
            {
                $Type: 'UI.DataField',
                Value: WaageScheinDate2,
            },
 //         {
 //               $Type: 'UI.DataField',
 //              Value: WaageScheinTime ,
 //               visible: false,
 //           },
           {
                $Type: 'UI.DataField',
                Value: WaageScheinBruto2 ,
            },
         {
                $Type: 'UI.DataField',
                Value: WaageScheinNetto2 ,
            },
          
         {
                $Type: 'UI.DataField',
                Value: WaageScheinTara2,
            },
           
        ],
    },

     UI.FieldGroup #FSEGroup           : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: FSEDate,
            },
         {
                $Type: 'UI.DataField',
                Value: FSEAlternativeMenge,
            },
            {
                $Type: 'UI.DataField',
                Value: FSETrockenGehalt,
            },
          {
                $Type: 'UI.DataField',
                Value: FSEAGewicht ,
            },
                 
        ],
    },
     UI.FieldGroup #SAPGroup           : {
        $Type: 'UI.FieldGroupType',
        Data : [
            
          
                {
                $Type: 'UI.DataField',
                Value:  to_ProcessSAPDocumentOut
            },
   
                 
        ],
    },

 
    UI.FieldGroup #DateGroup              : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: createdAt,
            },
            {
                $Type: 'UI.DataField',
                Value: createdBy,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedAt,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedBy,
            },
        ],
    },

    
    UI.Collection                         : [{
        ID   : 'MeasuresInfoCollection',
        // ID for the collection
        Label: 'Measures',
        // Tab title
        Type : #Collection,
    }

    ],


    UI.Facets                             : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'Create',
            Label : '{@i18n>createFacet}',
            Target: '@UI.FieldGroup#CreateGroup',
        },
        {
            $Type        : 'UI.ReferenceFacet',
            ID           : 'Common',
            Label        : '{@i18n>commonFacet}',
            Target       : '@UI.FieldGroup#CommonGroup',

        },

      {
            $Type : 'UI.ReferenceFacet',
            ID    : 'LKWInfo',
            Label : '{@i18n>LKWFacet}',
            Target: '@UI.FieldGroup#LKWGroup',
        },
 
      {
         $Type : 'UI.ReferenceFacet',
            ID    : 'SAPInfoOut',
            Label : '{@i18n>sapFacetOut}',
//            Target: '@UI.FieldGroup#SAPGroup',
              Target: 'to_ProcessSAPDocumentOut/@UI.PresentationVariant',        
        },
     {
         $Type : 'UI.ReferenceFacet',
            ID    : 'SAPInfoIn',
            Label : '{@i18n>sapFacetIn}',
//            Target: '@UI.FieldGroup#SAPGroup',
              Target: 'to_ProcessSAPDocumentIn/@UI.PresentationVariant',        
        },
 

       {
            $Type : 'UI.ReferenceFacet',
            ID    : 'WaageInfo',
            Label : '{@i18n>waageFacet}',
            Target: '@UI.FieldGroup#WaageGroup',
        },
          {
            $Type : 'UI.ReferenceFacet',
            ID    : 'WaageInfo2',
            Label : '{@i18n>waageFacet2}',
            Target: '@UI.FieldGroup#WaageGroup2',
        },
     {
            $Type : 'UI.ReferenceFacet',
            ID    : 'FSEInfo',
            Label : '{@i18n>fseFacet}',
            Target: '@UI.FieldGroup#FSEGroup',
            ![@UI.Hidden]: {$edmJson: {$If: [
                {$Or: [
                    {$Eq: [
                        {$Path: 'processTypeID_ID'},
                        '10 - Auslieferung palettierte Ware'
                    ]},
                    {$Eq: [
                        {$Path: 'processTypeID_ID'},
                        '20 - Anlieferung LVS-gefährtes'
                    ]}
                ]},
                false,
                true
            ]}}
        },

   
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'DateFacet',
            Label : '{@i18n>datesFacet}',
            Target: '@UI.FieldGroup#DateGroup',
        },
      
    ],
    UI.HeaderInfo                         : {
        TypeName      : '{@i18n>RootEntities}',
        TypeNamePlural: '{@i18n>RootEntities}',
        Title         : {
            $Type: 'UI.DataField',
            Value: duns,
        },
        Description   : {
            $Type: 'UI.DataField',
            Value: '{@i18n>RootEntity}',
        },
    },

);

 annotate service.ProcessSAPDocumentIn with @(
    Capabilities.UpdateRestrictions: {Updatable: true},
    UI                             : {
        HeaderInfo: {
            $Type         : 'UI.HeaderInfoType',
            TypeName      : '{i18n>SapDocumentIn}',
            TypeNamePlural: '{i18n>SapDocumentIn}'
        },

        PresentationVariant           : {
        Visualizations: ['@UI.LineItem'],
  //      SortOrder     : [{
  //          $Type     : 'Common.SortOrderType',
   //         Property  : sapDocumentInID,
  //          Descending: false
  //      }]
      },
        
       SelectionFields               : [],
        LineItem  : [

            {
                $Type: 'UI.DataField',
                Value: sapDocumentInID,
                Label: '{@i18n>sapDocumentInID}',
            },
            {
                $Type: 'UI.DataField',
                Value: to_SapDocument_DocNumber,
                Label: '{@i18n>sapDocumentInNumber}',
            },
           
          
             {
                $Type: 'UI.DataField',
                Value: to_SapDocument.DocType,
   
            },
              {
                $Type: 'UI.DataField',
                Value: to_SapDocument.DocTypeDesc,
       
            },
           {
                $Type: 'UI.DataField',
                Value: to_SapDocument.description,
          
            },
           {
                $Type: 'UI.DataField',
                Value: to_SapDocument.CustomerNumber,
          
            },
     
          {
                $Type: 'UI.DataField',
                Value: to_SapDocument.CustomerName,
          
            },         
           
        ]
    }
);
 annotate service.ProcessSAPDocumentOut with @(
    Capabilities.UpdateRestrictions: {Updatable: true},
    UI                             : {
        HeaderInfo: {
            $Type         : 'UI.HeaderInfoType',
            TypeName      : '{i18n>SapDocumentOut}',
            TypeNamePlural: '{i18n>SapDocumentOut}'
        },

        PresentationVariant           : {
        Visualizations: ['@UI.LineItem'],
  //      SortOrder     : [{
  //          $Type     : 'Common.SortOrderType',
   //         Property  : sapDocumentInID,
  //          Descending: false
  //      }]
      },
        
       SelectionFields               : [],
        LineItem  : [

            {
                $Type: 'UI.DataField',
                Value: sapDocumentOutID,
                Label: '{@i18n>sapDocumentOutID}',
            },
      
            {
                $Type: 'UI.DataField',
                Value: to_SapDocument_DocNumber,
                Label: '{@i18n>sapDocumentOutNumber}',
            },
             {
                $Type: 'UI.DataField',
                Value: to_SapDocument.DocType,
   
            },
              {
                $Type: 'UI.DataField',
                Value: to_SapDocument.DocTypeDesc,
       
            },
           {
                $Type: 'UI.DataField',
                Value: to_SapDocument.description,
          
            },
           {
                $Type: 'UI.DataField',
                Value: to_SapDocument.CustomerNumber,
          
            },
     
          {
                $Type: 'UI.DataField',
                Value: to_SapDocument.CustomerName,
          
            },
     
          
           
        ]
    }
);   
/*
//Insolvenz List Report in Object page
annotate service.InsolvencyMeasures with @(
    Capabilities.UpdateRestrictions: {Updatable: true},
    UI                             : {
        HeaderInfo: {
            $Type         : 'UI.HeaderInfoType',
            TypeName      : '{i18n>measures}',
            TypeNamePlural: '{i18n>measures}'
        },
        LineItem  : [

            {
                $Type: 'UI.DataField',
                Value: measuresTypeId_ID,
                Label: '{@i18n>measuresType}',
            },
            {
                $Type: 'UI.DataField',
                Value: measuresClassId_ID,
                Label: '{@i18n>measuresClass}',
            },
            {
                $Type: 'UI.DataField',
                Value: liquidityEffect,
                Label: '{@i18n>liquidityEffect}',
            },
            {
                $Type: 'UI.DataField',
                Value: yieldEffect,
                Label: '{@i18n>yieldEffect}',
            },
            {
                $Type: 'UI.DataField',
                Value: releaseLocking,
                Label: '{@i18n>releaseLocking}',
            },
            {
                $Type: 'UI.DataField',
                Value: fundsOutflowCurrentYear,
                Label: '{@i18n>fundsOutflowCurrentYear}',
            },
            {
                $Type: 'UI.DataField',
                Value: measuresDate,
                Label: '{@i18n>measuresDate}',
            },
            {
                $Type: 'UI.DataField',
                Value: fundsOutflowNextYear,
                Label: '{@i18n>fundsOutflowNextYear}',
            },
            {
                $Type: 'UI.DataField',
                Value: measuresResponsible,
                Label: '{@i18n>measuresResponsible}',
            },
            {
                $Type: 'UI.DataField',
                Value: commentMeasures,
                Label: '{@i18n>commentMeasures}',
            },
        ]
    }
);

//Crisis List Report in Object page
annotate service.CrisisMeasures with @(
    Capabilities.UpdateRestrictions: {Updatable: true},
    UI                             : {
        HeaderInfo: {
            $Type         : 'UI.HeaderInfoType',
            TypeName      : '{i18n>measures}',
            TypeNamePlural: '{i18n>measures}'
        },
        LineItem  : [

            {
                $Type: 'UI.DataField',
                Value: measuresTypeId_ID,
                Label: '{@i18n>measuresType}',
            },
            {
                $Type: 'UI.DataField',
                Value: measuresClassId_ID,
                Label: '{@i18n>measuresClass}',
            },

            {
                $Type: 'UI.DataField',
                Value: liquidityEffect,
                Label: '{@i18n>liquidityEffect}',
            },
            {
                $Type: 'UI.DataField',
                Value: yieldEffect,
                Label: '{@i18n>yieldEffect}',
            },
            {
                $Type: 'UI.DataField',
                Value: releaseLocking,
                Label: '{@i18n>releaseLocking}',
            },
            {
                $Type: 'UI.DataField',
                Value: fundsOutflowCurrentYear,
                Label: '{@i18n>fundsOutflowCurrentYear}',
            },
            {
                $Type: 'UI.DataField',
                Value: fundsOutflowNextYear,
                Label: '{@i18n>fundsOutflowNextYear}',
            },
            {
                $Type: 'UI.DataField',
                Value: measuresDate,
                Label: '{@i18n>measuresDate}',
            },
            {
                $Type: 'UI.DataField',
                Value: measuresResponsible,
                Label: '{@i18n>measuresResponsible}',
            },
            {
                $Type: 'UI.DataField',
                Value: commentMeasures,
                Label: '{@i18n>commentMeasures}',
            },
            {
                $Type: 'UI.DataField',
                Value: leadBuyer,
                Label: '{@i18n>leadBuyer}',
            },


        ]
    }
);

annotate service.InsolvencyMeasures with {
    measuresClassId @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'MeasuresClass',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: measuresClassId_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};

annotate service.InsolvencyMeasures with {
    measuresTypeId @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'MeasuresType',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: measuresTypeId_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};

annotate service.CrisisMeasures with {
    measuresClassId @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'MeasuresClass',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: measuresClassId_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};

annotate service.CrisisMeasures with {
    measuresTypeId @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'MeasuresType',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: measuresTypeId_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};

annotate service.Process with {
    duns @Common.ValueList: {
        CollectionPath: 'FinanzRating',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: duns,
                ValueListProperty: 'DUNS'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'FIRMENNAME'
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'SCORE_FINAL'
            }
        ]
    };
};

annotate service.Process with {
    bearbeiterId @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'User',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: bearbeiterId_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'nachName',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'vorName',
            },
        ],
    }
};

annotate service.InsolvencyMeasures with {
    measuresResponsible @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'User',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: measuresResponsible,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'nachName',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'vorName',
            },
        ],
    }
};

annotate service.Process with {
    vertieftesRating @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'Rating',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: vertieftesRating_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};

annotate service.Process {
    actualRating @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'Rating',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: actualRating_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};
*/
annotate service.Process with {
    processTypeID @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'ProcessType',
     
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: processTypeID_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};



annotate service.Process with {
    processStatusID @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'ProcessStatus',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: processStatusID_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};

annotate service.ProcessSAPDocumentIn with {
    to_SapDocument @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'SAPDocument',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: to_SapDocument_DocNumber,
                ValueListProperty: 'DocNumber',
            },
                      {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'DocType',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'DocTypeDesc',
                 },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
                 },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'CustomerNumber',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'CustomerName',
            },
            
        ],
    }
};
annotate service.ProcessSAPDocumentOut with {
    to_SapDocument @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'SAPDocument',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: to_SapDocument_DocNumber,
                ValueListProperty: 'DocNumber',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'DocType',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'DocTypeDesc',
                 },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
                 },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'CustomerNumber',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'CustomerName',
            },
    
        ],
    }
};


/*
annotate service.Process with {
    typeCaseId @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'TypeCase',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: typeCaseId_ID,
                ValueListProperty: 'ID',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'description',
            },
        ],
    }
};

*/

