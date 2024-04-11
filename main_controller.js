// main_controller.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the proto files for the three services
const waterSensorProtoPath = 'C:/Users/Alberto/Desktop/NCI/SEMESTER 2/Distributed System (JavaScript)/CA1/GIT_WaterSensor/GIT_WaterSensor/WaterPollutionSensor.proto';
const centralServerProtoPath = 'C:/Users/Alberto/Desktop/NCI/SEMESTER 2/Distributed System (JavaScript)/CA1/GIT_WaterSensor/GIT_WaterSensor/CentralServer.proto';
const clientAppProtoPath = 'C:/Users/Alberto/Desktop/NCI/SEMESTER 2/Distributed System (JavaScript)/CA1/GIT_WaterSensor/GIT_WaterSensor/ClientApplication.proto';

const WaterPollutionSensorPackageDefinition = protoLoader.loadSync(WaterPollutionSensor);
const CentralServerPackageDefinition = protoLoader.loadSync(CentralServer);
const ClientApplicationPackageDefinition = protoLoader.loadSync(ClientApplication);

// Load the proto objects
const WaterPollutionSensor = grpc.loadPackageDefinition(WaterPollutionSensorPackageDefinition).WaterPollutionSensor;
const CentralServer = grpc.loadPackageDefinition(CentralServerPackageDefinition).CentralServer;
const ClientApplication = grpc.loadPackageDefinition(ClientApplicationPackageDefinition).ClientApplication;

// Create clients for the three services
const waterSensorClient = new waterSensorProto.WaterPollutionSensor('localhost:50059', grpc.credentials.createInsecure());
const centralServerClient = new centralServerProto.CentralServer('localhost:50058', grpc.credentials.createInsecure());
const clientAppClient = new clientAppProto.ClientApplication('localhost:50057', grpc.credentials.createInsecure());

// Example usage of the services
// Discover and use services here
