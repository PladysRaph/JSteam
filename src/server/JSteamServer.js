import http from 'http';
import express from 'express';
import { Server as IOServer } from 'socket.io';

export default class JSteamServer {
	static PORT = process.env.PORT == undefined ? 8000 : process.env.PORT;

	constructor(express) {
		this.express = express;
		this.httpServer = http.createServer(this.express);
		this.routes();
		this.httpServer.listen(JSteamServer.PORT, () => {
			console.log(`JSteam server is running at http://localhost:${JSteamServer.PORT}/`);
		});
		this.socketServer = new IOServer(this.httpServer);
		this.handleSocketConnection();
		this.difficultyParties = [];
	}

	routes() {
		// Routes statiques
		this.express.use('/public', express.static('public'));
        
		// Home
        this.express.use('/home', express.static('index.html'));

        this.express.get('/', (req, res) => {
            res.redirect('/home');
        });
	}

	handleSocketConnection() {
		this.socketServer.on('connection', socket => {

			socket.on('create party', (id, difficulty) => {
				// L'utilisateur créé la room et la rejoint
				this.difficultyParties.push({
					"id": id,
					"difficulty":  difficulty
				});
				socket.join(id);
			});

			socket.on('join party', data => {
				socket.join(data.id);
				this.socketServer.to(data.id).emit('un nouveau joueur rejoint la partie', {
					"avatar_url": data.model.player.avatar.url,
					"username": data.model.player.name
				});
			});

			socket.on('start game', idRoom => {
				this.socketServer.to(idRoom).emit('la partie commence');
			});
		});
	}
}