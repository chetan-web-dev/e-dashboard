//Boot application:Load environments variables,Import app,Start server

const path = require('path');
const http = require('http');

// Load environment variables
/*require('dotenv').config({
    path:path.resolve(__dirname, './.env')
});*/

require('dotenv').config();

// Validate PORT
const PORT = process.env.PORT || 5000;
console.log(PORT)

// Load app
const app = require('./app');

// Connect DB
require('./config/db');

// Create HTTP server
const server = http.createServer(app);

//Server port listen
server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
}); 

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${process.env.PORT} is already in use`);
        process.exit(1);
    } 
    console.error(err);
});

// Handle unhandled promise rejections
/*process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});*/