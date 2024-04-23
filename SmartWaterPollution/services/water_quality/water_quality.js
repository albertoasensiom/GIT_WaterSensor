// Import the Empty message from the google-protobuf library.
const { Empty } = require('google-protobuf/google/protobuf/empty_pb');
// Import the gRPC module.
const grpc = require('@grpc/grpc-js');
// Import proto-loader for loading .proto files.
const protoLoader = require('@grpc/proto-loader');

// Define the file path to the water_quality.proto file.
const PROTO_PATH = __dirname + '/water_quality.proto';
// Load the water_quality.proto file.
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
// Load the water_quality package from the loaded .proto file.
const quality_proto = grpc.loadPackageDefinition(packageDefinition).water_quality;

// Define the function to handle RPC calls for getting water quality data.
function getQualityData(call, callback) {
  // Generate a random pH value between 0 and 14.
  const pH = Math.random() * 14;
  // Specify the location for the data, for example, a hometown.
  const location = "Almería, Spain"; // Example: My hometown

  // Construct the response object with location and quality data.
  const response = {
    location: location,
    quality: pH
  };

  // Send the constructed response back to the client.
  callback(null, response);
}

// Main function to start the gRPC server.
function main() {
  // Create a new instance of the gRPC server.
  const server = new grpc.Server();
  // Add the WaterQualityService with the getQualityData method to the server.
  server.addService(quality_proto.WaterQualityService.service, { getQualityData: getQualityData });
  // Bind the server to the specified address and port with insecure credentials and start the server.
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    // Log a message when the server starts running.
    console.log('Quality server is now running on port 50051');
    // Start the gRPC server.
    server.start();
  });
}

main(); // Call the main function to start the server.
