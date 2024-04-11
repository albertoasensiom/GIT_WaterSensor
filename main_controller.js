// main_controller.js
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// Load the proto files for the three services
const waterSensorProtoPath = __dirname + '/water_pollution_sensor.proto';
const centralServerProtoPath = __dirname + '/central_server.proto';
const clientAppProtoPath = __dirname + '/client_application.proto';

const waterSensorPackageDefinition = protoLoader.loadSync(waterSensorProtoPath);
const centralServerPackageDefinition = protoLoader.loadSync(centralServerProtoPath);
const clientAppPackageDefinition = protoLoader.loadSync(clientAppProtoPath);

// Load the proto objects
const waterSensorProto = grpc.loadPackageDefinition(waterSensorPackageDefinition).WaterPollutionSensor;
const centralServerProto = grpc.loadPackageDefinition(centralServerPackageDefinition).CentralServer;
const clientAppProto = grpc.loadPackageDefinition(clientAppPackageDefinition).ClientApplication;

// Create clients for the three services
const waterSensorClient = new waterSensorProto.WaterPollutionSensor('localhost:50051', grpc.credentials.createInsecure());
const centralServerClient = new centralServerProto.CentralServer('localhost:50052', grpc.credentials.createInsecure());
const clientAppClient = new clientAppProto.ClientApplication('localhost:50053', grpc.credentials.createInsecure());

// Example usage of the services
// Discover and use services here
