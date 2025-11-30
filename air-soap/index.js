const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

// Définition des méthodes SOAP
const service = {
  AirQualityService: {
    AirQualityPort: {
      GetAQI: function(args) {
        // Mock : renvoie un AQI aléatoire
        const zone = args.zone;
        const AQI = Math.floor(Math.random() * 200); // 0 à 200
        return { AQI };
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
