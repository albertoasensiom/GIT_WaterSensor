// water_pollution_sensor.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/water_pollution_sensor.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const sensor_proto = grpc.loadPackageDefinition(packageDefinition).WaterPollutionSensor;

const server = new grpc.Server();

server.addService(sensor_proto.WaterPollutionSensor.service, {
  ReportPollution: function(call, callback) {
    console.log("Received pollution data:", call.request);
    callback(null, { message: "Pollution data received successfully." });
  },
});

server.bind('0.0.0.0:50059', grpc.ServerCredentials.createInsecure());
console.log('Water Pollution Sensor running at http://0.0.0.0:50059');
server.start();
