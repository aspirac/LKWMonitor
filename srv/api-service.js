const cds = require('@sap/cds');
const axios = require('axios');

module.exports = cds.service.impl(async function() {

    // Handle READ event for NearEarthObjects entity
    this.on('READ', 'NearEarthObjects', async (req) => {
        try {
            debugger;
            const apiKey = 'DEMO_KEY'; 
            const startDate = '2025-06-01';
            const endDate = '2025-06-08';

            // Build NASA API URL
            const nasaURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
            const response = await axios.get(nasaURL);

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
    });


      // DEMO FUNCTION - getSumBookPrices function implementation
  this.on('getAllObjects', async (req) => {
  
            try {
            debugger;
            const apiKey = 'DEMO_KEY'; 
            const startDate = '2025-06-01';
            const endDate = '2025-06-08';

            // Build NASA API URL
            const nasaURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
            const response = await axios.get(nasaURL);

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
    
  });

});