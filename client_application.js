// client_application.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/client_application.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const client_proto = grpc.loadPackageDefinition(packageDefinition).ClientApplication;

const client = new client_proto('localhost:50057', grpc.credentials.createInsecure());

function getPollutionLevel(location) {
  client.GetPollutionLevel({ location: location }, (err, response) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log('Pollution level at', location, 'is:', response.pollution_level);
  });
}

const location = 'Sample Location'; // Provide the location you want to query
getPollutionLevel(location);
