const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/protos/smartwater.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const smartwaterProto = grpc.loadPackageDefinition(packageDefinition).smartwater;

// Assuming you have already defined the server address and credentials
const serverAddress = 'localhost:50051';
const credentials = grpc.credentials.createInsecure();

// Creating clients for each service
const sensorService = new smartwaterProto.Sensor(serverAddress, credentials);
const monitoringService = new smartwaterProto.Monitoring(serverAddress, credentials);
const dataStorageService = new smartwaterProto.DataStorage(serverAddress, credentials);

// Example usage of the services
sensorService.SendData({ sensor_id: '123', water_quality: 5.6 }, (err, response) => {
    if (err) {
        console.error('Error sending sensor data:', err);
    } else {
        console.log('Sensor data sent successfully:', response.message);
    }
});

monitoringService.GetWaterQuality({}, (err, response) => {
    if (err) {
        console.error('Error getting water quality:', err);
    } else {
        console.log('Water quality:', response.water_quality);
    }
});

dataStorageService.RetrieveData({}, (err, response) => {
    if (err) {
        console.error('Error retrieving data:', err);
    } else {
        console.log('Retrieved data:', response.data);
    }
});
