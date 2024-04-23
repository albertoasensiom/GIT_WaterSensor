const { Empty } = require('google-protobuf/google/protobuf/empty_pb'); // Import the Empty message from google-protobuf
const grpc = require('@grpc/grpc-js'); // Import gRPC module
const protoLoader = require('@grpc/proto-loader'); // Import proto-loader for loading .proto files

const PROTO_PATH = __dirname + '/water_location.proto'; // Path to the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH); // Load the .proto file
const location_proto = grpc.loadPackageDefinition(packageDefinition).water_location; // Load the water_location package

// Define the method to handle GetLocationData RPC calls
function getLocationData(call, callback) {
  const location = "Almería, Spain: Water Source number 3"; // Almería paradise

  const response = {
    location: location
  };

  callback(null, response); // Send the response back to the client
}

// Main function to start the server
function main() {
  const server = new grpc.Server(); // Create a new gRPC server instance
  // Add the WaterLocationService with the getLocationData method to the server
  server.addService(location_proto.WaterLocationService.service, { getLocationData: getLocationData });
  // Bind the server to the specified address and port, and start the server
  server.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Location server running on port 50053'); // Log a message when the server starts
    server.start(); // Start the gRPC server
  });
}

main(); // Call the main function to start the server
