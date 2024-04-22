const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load water_quality.proto
const qualityProtoPath = __dirname + '/water_quality.proto';
const qualityPackageDefinition = protoLoader.loadSync(qualityProtoPath);
const quality_proto = grpc.loadPackageDefinition(qualityPackageDefinition).water_quality;

// Load water_quantity.proto
const quantityProtoPath = __dirname + '/water_quantity.proto';
const quantityPackageDefinition = protoLoader.loadSync(quantityProtoPath);
const quantity_proto = grpc.loadPackageDefinition(quantityPackageDefinition).water_quantity;

// Load water_location.proto
const locationProtoPath = __dirname + '/water_location.proto';
const locationPackageDefinition = protoLoader.loadSync(locationProtoPath);
const location_proto = grpc.loadPackageDefinition(locationPackageDefinition).water_location;

function getQualityData() {
  const client = new quality_proto.WaterQualityService('localhost:50051', grpc.credentials.createInsecure());
  client.GetQualityData({}, (error, response) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Quality Data:', response);
    }
  });
}

function getQuantityData() {
  const client = new quantity_proto.WaterQuantityService('localhost:50052', grpc.credentials.createInsecure());
  client.GetQuantityData({}, (error, response) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Quantity Data:', response);
    }
  });
}

function getLocationData() {
  const client = new location_proto.WaterLocationService('localhost:50053', grpc.credentials.createInsecure());
  client.GetLocationData({}, (error, response) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Location Data:', response);
    }
  });
}

// Call the methods
getQualityData();
getQuantityData();
getLocationData();
