service WaageDataService {
    
    entity WaageInfo {
        key LKW_Kennzeichen : String(20);
        Trailer_Kennzeichen : String(20);
        Fahrername          : String(20);
        WaageScheinNr       : Decimal;
        WaageScheinDate     : Date;
 //       WaageScheinTime     : Time;
        WaageScheinBruto    : Decimal;
        WaageScheinNetto    : Decimal;
        WaageScheinTara     : Decimal;
      
    }

 entity FSAInfo {
        key Trailer_Kennzeichen : String(20);
        Fahrername          : String(20);
        FSEAlternativeMenge : Decimal;
        FSETrockenGehalt    : Decimal;
        FSEAGewicht         : Decimal;
    }
    entity WaageIn {
    key    LKW_Kennzeichen     : String(20);
  //      Trailer_Kennzeichen : String(20);
  //      Fahrername          : String(20);
  //      WaageScheinNr       : Decimal;
  //      WaageScheinDate     : DateTime;
  //      WaageScheinTime     : Time;
  //      WaageScheinBruto    : Decimal;
  //      WaageScheinNetto    : Decimal;
  //      WaageScheinTara     : Decimal;
  //      FSEAlternativeMenge : Decimal;
  //      FSETrockenGehalt    : Decimal;
  //      FSEAGewicht         : Decimal;
    }

    //   action getAllObjects (NearEarthObjects: many NearEarthObjects) returns array of NearEarthObjects;
        function PutWaageInfo(LKWKennzeichen: String, Fahrername: String) returns array of WaageInfo;
        function GetWaageInfo(LKWKennzeichen: String, Fahrername: String) returns array of WaageInfo;
    

}