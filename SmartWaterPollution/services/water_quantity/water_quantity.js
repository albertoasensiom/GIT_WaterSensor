const { Empty } = require('google-protobuf/google/protobuf/empty_pb'); // Import the Empty message from google-protobuf
const grpc = require('@grpc/grpc-js'); // Import gRPC module
const protoLoader = require('@grpc/proto-loader'); // Import proto-loader for loading .proto files

const PROTO_PATH = __dirname + '/water_quantity.proto'; // Path to the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH); // Load the .proto file
const quantity_proto = grpc.loadPackageDefinition(packageDefinition).water_quantity; // Load the water_quantity package

// Define the method to handle GetQuantityData RPC calls
function getQuantityData(call, callback) {
  // Generate a random quantity value (e.g., in liters)
  const quantity = Math.random() * 1000; // Random value between 0 and 1000 liters
  const location = "Almería, Spain"; // My hometown!

  const response = {
    location: location,
    quantity: quantity
  };

  callback(null, response); // Send the response back to the client
}

// Main function to start the server
function main() {
  const server = new grpc.Server(); // Create a new gRPC server instance
  // Add the WaterQuantityService with the getQuantityData method to the server
  server.addService(quantity_proto.WaterQuantityService.service, { getQuantityData: getQuantityData });
  // Bind the server to the specified address and port, and start the server
  server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Quantity server running on port 50052'); // Log a message when the server starts
    server.start(); // Start the gRPC server
  });
}

main(); // Call the main function to start the server
