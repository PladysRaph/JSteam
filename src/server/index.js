import Server from './server.js'
import express from 'express';
import addWebpackMiddleware from './webpack_middleware.js';

let app = express();

// Compile à la volée le code client (hot-reloading)
addWebpackMiddleware(app);

// Démarrer un serveur Express.js
new Server(app);