service NasaDataService {
    
    entity NearEarthObjects {
        key id                                : String;
            name                              : String;
            is_potentially_hazardous_asteroid : Boolean;
            nasa_jpl_url                      : String;
            kilometers_per_hour               : String;
    }

   //   action getAllObjects (NearEarthObjects: many NearEarthObjects) returns array of NearEarthObjects;
        function getAllObjects() returns array of NearEarthObjects;
    

}