const cds = require ('@sap/cds');
const axios = require('axios');

 export async function onCallInterface(oContext, aSelectedContexts){
      try {
                    const apiKey = 'DEMO_KEY'; 
                    const startDate = '2025-06-01';
                    const endDate = '2025-06-08';
           debugger;
                    let oLicencePlate = "M-AB1234";
                    let oDriverName = "Max Mustermann";
                    const apiURL = 'https://api.example.com/endpoint' + '(LKWKennzeichen = \'' + oLicencePlate + '\', Fahrername = \'' + oDriverName + '\' )';
                //    const apiURL = oURL + '(LKWKennzeichen = \'' + oLicencePlate + '\', Fahrername = \'' + oDriverName + '\' )';
                    const apiResponse = await axios.get(apiURL);
       
                    return;
                     } catch (error) {
                    // Handle errors during API call
                    console.error(error.message);
                    req.error(500, 'An error occurred while fetching data from the NASA API.');
                }
   }

 export async function callApi(oURL, oLicencePlate, oDriverName) {
      try {
                    const apiKey = 'DEMO_KEY'; 
                    const startDate = '2025-06-01';
                    const endDate = '2025-06-08';
           debugger;
                    const apiURL = oURL + '(LKWKennzeichen = \'' + oLicencePlate + '\', Fahrername = \'' + oDriverName + '\' )';
                    const apiResponse = await axios.get(apiURL);
                    return;
                    // Build NASA API U
                    const nasaURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
           //         const response = await axios.get(nasaURL);
        
                    const nearEarthObjects = response.data.near_earth_objects;
                    const results = [];
        
                    // Extract and format NEO data from response
                    for (const date in nearEarthObjects) {
                        for (const neo of nearEarthObjects[date]) {
                            results.push({
                                id: neo.id,
                                name: neo.name,
                                is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
                                nasa_jpl_url: neo.nasa_jpl_url,
                                kilometers_per_hour: neo.close_approach_data[0]?.relative_velocity?.kilometers_per_hour || 'N/A'
                            });
                        }
                    }
        
                    return results;
        
                } catch (error) {
                    // Handle errors during API call
                    console.error(error.message);
                    req.error(500, 'An error occurred while fetching data from the NASA API.');
                }
  
}
