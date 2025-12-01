const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Données mock pour les mesures
let measures = [
    { stationId: 1, PM25: 10, PM10: 20, NO2: 30, O3: 40 },
    { stationId: 2, PM25: 15, PM10: 25, NO2: 35, O3: 45 }
];

// Service SOAP
const service = {
    AirQualityService: {
        AirQualityPort: {
            GetAQI: function(args) {
                const zone = args.zone;
                const AQI = Math.floor(Math.random() * 200);
                return { AQI };
            },
            GetPollutants: function(args) {
                const zone = args.zone;
                // Mock : renvoie des valeurs aléatoires
                return {
                    PM25: Math.floor(Math.random() * 100),
                    PM10: Math.floor(Math.random() * 100),
                    NO2: Math.floor(Math.random() * 100),
                    O3: Math.floor(Math.random() * 100)
                };
            },
            CompareZones: function(args) {
                const zone1AQI = Math.floor(Math.random() * 200);
                const zone2AQI = Math.floor(Math.random() * 200);
                return { zone1AQI, zone2AQI };
            },
            AddMeasure: function(args) {
                const newMeasure = {
                    stationId: args.stationId,
                    PM25: args.PM25,
                    PM10: args.PM10,
                    NO2: args.NO2,
                    O3: args.O3
                };
                measures.push(newMeasure);
                return { status: "OK", measureId: measures.length };
            },
            GetAllMeasures: function() {
                // Retourne toutes les mesures sous forme de string JSON
                return { measures: JSON.stringify(measures) };
            }
        }
    }
};  

// Lecture du WSDL
const wsdlPath = path.join(__dirname, 'air.wsdl');
const wsdlXml = fs.readFileSync(wsdlPath, 'utf8');

// Création du serveur SOAP
soap.listen(app, '/air', service, wsdlXml);

app.listen(port, () => {
    console.log(`Air SOAP service listening on port ${port}`);
});
