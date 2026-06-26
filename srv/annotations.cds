using DDRMService from './ddrmcap-service';

annotate DDRMService.Process with @title: 'LKW Vorgang';
annotate DDRMService.ProcessSAPDocumentOut with @title: 'Zugeordnete Belege - Ausgang';
annotate DDRMService.ProcessSAPDocumentIn with @title: 'Zugeordnete Belege - Eingang';







annotate DDRMService.ProcessType with {
    ID          @title                 : '{@i18n>processTypeId}';              
    description @title: '{@i18n>ProcessTypeDescription}'
     @Core.Immutable;
  
  
}


annotate DDRMService.ProcessType  with @(
    Common.Text: {
        $value: 'description',
        ![@UI.TextArrangement]: #TextLast
    }
);

annotate DDRMService.ProcessType with {
    description
    @readonly;
}

annotate DDRMService.ProcessStatus with {
   
    ID          @title: '{@i18n>id}';
    description @title: '{@i18n>ProcessStatusDescription}'
    @Core.Immutable;

}

annotate DDRMService.SAPDocument with {
    DocNumber         @title: '{@i18n>docNumber}' ;
    DocType @title: '{@i18n>sapDocumentType}' @readonly;
    DocTypeDesc @title: '{@i18n>sapDocumentTypeDescription}' @readonly;
    description @title: '{@i18n>description}' @readonly;
    CustomerNumber @title: '{@i18n>sapDocumentClientNumber}'@readonly;
    CustomerName   @title: '{@i18n>sapDocumentClientName}' @readonly;
}



annotate DDRMService.Process with {
 
    processTypeID @title: '{@i18n>processTypeId}';
    processStatusID @title: '{@i18n>processStatusId}';
    LKW_Kennzeichen @title: '{@i18n>LKWKennzeichen}';
    Trailer_Kennzeichen @title: '{@i18n>TrailerKennzeichen}';
    Fahrername @title: '{@i18n>Fahrername}';
    Frachtfuehrername  @title:'{@i18n>Frachtfuehrername}';
    Containernummer_1 @title: '{@i18n>Containernummer_1}';
    Siegelnummer @title: '{@i18n>Siegelnummer}';
    Bemerkung_1  @title: '{@i18n>Bemerkung_1}'  @UI.multiLineText: true;
    Bemerkung_2  @title: '{@i18n>Bemerkung_2}'  @UI.multiLineText: true;
    WaageScheinNr @title: '{@i18n>WaageScheinNr}';
    WaageScheinDate @title: '{@i18n>WaageScheinDate}';
  //  WaageScheinTime @title: '{@i18n>WaageScheinTime}';
    WaageScheinBruto  @title: '{@i18n>WaageScheinBruto}';
    WaageScheinNetto  @title: '{@i18n>WaageScheinNetto}';
    WaageScheinTara  @title: '{@i18n>WaageScheinTara}';
    FSEAlternativeMenge  @title: '{@i18n>FSEAlternativeMenge}';
    FSETrockenGehalt  @title: '{@i18n>FSETrockenGehalt}';
    FSEAGewicht  @title: '{@i18n>FSEAGewicht}';
  

}


annotate DDRMService.Process with {
    @UI.MultiLineText
    Bemerkung_1
};

annotate DDRMService.Process with {
    @UI.MultiLineText
    Bemerkung_2
};

annotate DDRMService.Process with {
    @odata.draft.bypass
    processTypeID

};

annotate DDRMService.Process with {
    @odata.draft.bypass
    LKW_Kennzeichen

};

annotate DDRMService.Process with @(
    Common.SideEffects : {
        SourceProperties : [ 'processStatusID' ],
        TargetEntities   : [ 'Process' ]
    }
);



