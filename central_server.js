// central_server.js
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/central_server.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const server_proto = grpc.loadPackageDefinition(packageDefinition).CentralServer;

const server = new grpc.Server();

server.addService(server_proto.CentralServer.service, {
  ReceiveData: function(call, callback) {
    console.log("Received pollution data at Central Server:", call.request);
    callback(null, { message: "Data received successfully at Central Server." });
  },
});

server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
console.log('Central Server running at http://0.0.0.0:50052');
server.start();
