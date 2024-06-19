const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Configurar Socket.io Server
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Client connected');

    // Emit an event when a product is added, updated, or deleted
    const notifyClients = (message) => {
      io.emit('product_updated', message);
    };

    // Example function to simulate adding, updating, or deleting a product
    const simulateProductChange = () => {
      const message = { type: 'PRODUCT_UPDATED' };
      notifyClients(message);
    };

    setInterval(simulateProductChange, 10000); // Simulate a product change every 10 seconds
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
