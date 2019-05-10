
  // server.js
  const express = require('express');
  const SocketServer = require('ws').Server;
  const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
    console.log('data sent to client from server');
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  let usersConnected = wss.clients.size;
  let usersOnline = {counter: usersConnected, type: 'onlineUsers'};
  wss.broadcast(usersOnline);


  ws.on('message', (data) => {

    let parsedMessage = JSON.parse(data);
    switch(parsedMessage.type) {
      case 'postMessage':
        parsedMessage.type = 'incomingMessage';
        parsedMessage.id = uuidv4();
        wss.clients.forEach(function each(client) {
          console.log(parsedMessage);
          client.send(JSON.stringify(parsedMessage));
        });
        break;
      case 'postNotification':
        parsedMessage.type = 'incomingNotification';
        parsedMessage.id = uuidv4();
        wss.clients.forEach(function each(client) {
          console.log(parsedMessage);
          client.send(JSON.stringify(parsedMessage));
        });
      }
    })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  

  
  
  
  ws.on('close', () => {
    console.log('Client disconnected')
    let usersConnected = wss.clients.size;
    let usersOnline = {counter: usersConnected, type: 'onlineUsers'};
    wss.broadcast(usersOnline)
  });
});

