service WaageDataService {
    
    entity WaageInfo {
        key id                                : String;
            name                              : String;
            is_potentially_hazardous_asteroid : Boolean;
            nasa_jpl_url                      : String;
            kilometers_per_hour               : String;
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