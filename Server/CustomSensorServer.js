const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/CustomSensor.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const customSensorProto = grpc.loadPackageDefinition(packageDefinition).custom_sensor;

const server = new grpc.Server();

server.addService(customSensorProto.CustomSensorService.service, {
  GetCustomSensorData: (_, callback) => {
    const customSensorData = {
      WaterQuantity: Math.random() * 1000 // Random water quantity value
    };
    callback(null, customSensorData);
  }
});

server.bind('localhost:50053', grpc.ServerCredentials.createInsecure());
console.log('CustomSensorServer running at http://localhost:50053');
server.start();
