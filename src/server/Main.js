import JSteamServer from './JSteamServer.js'
import express from 'express';
import addWebpackMiddleware from './WebpackMiddleware.js';

let app = express();

// Compile à la volée le code client (hot-reloading)
addWebpackMiddleware(app);

// Démarrer un serveur Express.js
new JSteamServer(app);