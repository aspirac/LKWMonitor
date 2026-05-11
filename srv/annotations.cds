using DDRMService from './ddrmcap-service';

annotate DDRMService.Process with @title: 'LKW Vorgang';
annotate DDRMService.ProcessSAPDocumentIn with @title: 'Zugeordnete Belege - Ingang';
annotate DDRMService.ProcessSAPDocumentOut with @title: 'Zugeordnete Belege - Ausgang';







annotate DDRMService.ProcessType with {
    ID          @title                 : '{@i18n>processTypeId}';
    //            @Common.Text           : description
    //            @Common.TextArrangement: #TextOnly;
    description @title: '{@i18n>ProcessTypeDescription}';

}


annotate DDRMService.ProcessStatus with {
    ID          @title: '{@i18n>id}';
    description @title: '{@i18n>description}';

}
annotate DDRMService.SAPDocument with {
    DocNumber         @title: '{@i18n>docNumber}';
    DocType @title: '{@i18n>docType}';
    description @title: '{@i18n>description}';
    CustomerNumber @title: '{@i18n>customerNumber}';
    CustomerName   @title: '{@i18n>customeName}';
}
annotate DDRMService.Process with {
 
   
 

    processTypeID @title: '{@i18n>processTypeId}';
    processStatusID @title: '{@i18n>processStatusId}';
    LKW_Kennzeichen @title: '{@i18n>LKWKennzeichen}';
    Trailer_Kennzeichen @title: '{@i18n>TrailerKennzeichen}';
    Fahrername @title: '{@i18n>Fahrername}';
    Frachtfuehrername  @title:'{@i18n>Frachtfuehrername}';
    Containernummer_1 @title: '{@i18n>Containernummer_1}';
    Containernummer_2 @title: '{@i18n>Containernummer_2}';
    Bemerkung_1  @title: '{@i18n>Bemerkung_1}'  @UI.multiLineText: true;
    Bemerkung_2  @title: '{@i18n>Bemerkung_2}'  @UI.multiLineText: true;
    WaageScheinNr @title: '{@i18n>WaageScheinNr}';
    WaageScheinDate @title: '{@i18n>WaageScheinDate}';
    WaageScheinTime @title: '{@i18n>WaageScheinTime}';
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

annotate DDRMService.Process @(Common : {
    SideEffects #StatusChanged : {
        SourceProperties : ['processStatusID_ID'],
        TargetProperties : ['processStatusID_ID']
    }
});



