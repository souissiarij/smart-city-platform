const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Charger le fichier proto
const PROTO_PATH = path.join(__dirname, 'urgences.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const urgencesProto = grpc.loadPackageDefinition(packageDefinition).urgences;

// Implémentation du service
const urgencesService = {
  SendAlert: (call, callback) => {
    console.log('Nouvelle alerte reçue:', call.request);
    // Ici on pourrait ajouter la logique de notification / traitement
    callback(null, {
      status: 'ok',
      message: `Alerte de type "${call.request.type}" reçue à "${call.request.location}"`
    });
  }
};

// Créer le serveur gRPC
const server = new grpc.Server();
server.addService(urgencesProto.UrgencesService.service, urgencesService);

// Écouter sur le port 5001
const PORT = '0.0.0.0:5001';
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Urgences gRPC service running on port ${port}`);
  server.start();
});
