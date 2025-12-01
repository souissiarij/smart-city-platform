const express = require('express');
const soap = require('soap');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4001; // REST wrapper port

const wsdlPath = path.join(__dirname, 'air.wsdl');
const wsdlXml = fs.readFileSync(wsdlPath, 'utf8');

// SOAP client initialisé
let soapClient;
soap.createClientAsync(wsdlPath).then(client => {
  soapClient = client;
}).catch(err => console.error("SOAP Client error:", err));

app.get('/aqi/:zone', async (req, res) => {
  if (!soapClient) return res.status(500).json({ error: "SOAP client not ready" });
  try {
    const zone = req.params.zone;
    const [result] = await soapClient.GetAQIAsync({ zone });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Air REST wrapper listening on port ${port}`);
});
