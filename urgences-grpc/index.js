const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'urgences.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const urgencesProto = grpc.loadPackageDefinition(packageDefinition).urgences;

const server = new grpc.Server();

// Implémentation de la méthode SendAlert
server.addService(urgencesProto.UrgencesService.service, {
  SendAlert: (call, callback) => {
    const { type, location } = call.request;
    console.log(`Alert received: ${type} at ${location}`);
    callback(null, { status: "ok", message: "Alert received successfully" });
  }
});

const PORT = 5001;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Urgences gRPC service running on port ${PORT}`);
  server.start();
});
