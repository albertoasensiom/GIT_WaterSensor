const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');
const PROTO_PATH = __dirname + '/Client.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const clientProto = grpc.loadPackageDefinition(packageDefinition).client;

const client = new clientProto.DataService('localhost:50051', grpc.credentials.createInsecure());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getDataFromServer() {
  rl.question('Enter 1 to get Water Quality data, 2 for Temperature data, 3 for Custom Sensor data: ', (choice) => {
    switch (parseInt(choice)) {
      case 1:
        client.GetWaterQualityData({}, (err, response) => {
          if (err) console.error('Error:', err);
          else console.log('Water Quality Data:', response);
          getDataFromServer();
        });
        break;
      case 2:
        client.GetTemperatureData({}, (err, response) => {
          if (err) console.error('Error:', err);
          else console.log('Temperature Data:', response);
          getDataFromServer();
        });
        break;
      case 3:
        client.GetCustomSensorData({}, (err, response) => {
          if (err) console.error('Error:', err);
          else console.log('Custom Sensor Data:', response);
          getDataFromServer();
        });
        break;
      default:
        console.log('Invalid choice');
        getDataFromServer();
        break;
    }
  });
}

getDataFromServer();
