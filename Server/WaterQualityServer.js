const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/WaterQuality.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const waterQualityProto = grpc.loadPackageDefinition(packageDefinition).water_quality;

const server = new grpc.Server();

server.addService(waterQualityProto.WaterQualityService.service, {
  GetWaterQualityData: (_, callback) => {
    const waterQualityData = {
      pH: Math.random() * 14, // Random pH value between 0 and 14
      conductivity: Math.random() * 100, // Random conductivity value
      turbidity: Math.random() * 10 // Random turbidity value
    };
    callback(null, waterQualityData);
  }
});

server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
console.log('WaterQualityServer running at http://localhost:50051');
server.start();
