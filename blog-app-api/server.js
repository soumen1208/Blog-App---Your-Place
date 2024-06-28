const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log("server is connected on port" + PORT);
})