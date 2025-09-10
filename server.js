const express = require('express');
const path = require('path');
const net = require('net');

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(startPort + 1).then(resolve, reject);
      } else {
        reject(err);
      }
    });
    
    server.once('listening', () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    
    server.listen(startPort);
  });
}

async function startServer() {
  try {
    const defaultPort = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const port = await findAvailablePort(defaultPort);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();