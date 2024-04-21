const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/Temperature.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const temperatureProto = grpc.loadPackageDefinition(packageDefinition).temperature;

const server = new grpc.Server();

server.addService(temperatureProto.TemperatureService.service, {
  GetTemperatureData: (_, callback) => {
    const temperatureData = {
      temperature: Math.random() * 100 // Random temperature value
    };
    callback(null, temperatureData);
  }
});

server.bind('localhost:50052', grpc.ServerCredentials.createInsecure());
console.log('TemperatureServer running at http://localhost:50052');
server.start();
