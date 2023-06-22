// Index.js for starting the server, no need to change this for now
const http = require('http');
// Import app.js
const app = require('./app');
// Create the server using http
const server = http.createServer(app);

// Set the port for the server
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// Let the app listen on that port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
