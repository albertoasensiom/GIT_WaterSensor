// Import the Empty message from google-protobuf
const { Empty } = require('google-protobuf/google/protobuf/empty_pb');
// Import gRPC module
const grpc = require('@grpc/grpc-js');
// Import proto-loader for loading .proto files
const protoLoader = require('@grpc/proto-loader');

// Path to the .proto file
const PROTO_PATH = __dirname + '/water_quality.proto';
// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
// Load the water_quality package
const quality_proto = grpc.loadPackageDefinition(packageDefinition).water_quality;

// Define the method to handle GetQualityData RPC calls
function getQualityData(call, callback) {
  // Generate a random pH value between 0 and 14
  const pH = Math.random() * 14;
  // Specify the location (e.g., a hometown)
  const location = "Almería, Spain"; // My hometown

  // Construct the response object with location and quality
  const response = {
    location: location,
    quality: pH
  };

  // Send the response back to the client
  callback(null, response);
}

// Main function to start the server
function main() {
  // Create a new gRPC server instance
  const server = new grpc.Server();
  // Add the WaterQualityService with the getQualityData method to the server
  server.addService(quality_proto.WaterQualityService.service, { getQualityData: getQualityData });
  // Bind the server to the specified address and port, and start the server
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    // Log a message when the server starts
    console.log('Quality server running on port 50051');
    // Start the gRPC server
    server.start();
  });
}

main(); // Call the main function to start the server
