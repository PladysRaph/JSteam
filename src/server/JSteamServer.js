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
		this.parties = new Map();
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

			socket.on('create party', partyInfo => {
				this.parties.set(partyInfo.id, {
					"id": partyInfo.id,
					"owner": partyInfo.owner,
					"difficulty": partyInfo.difficulty,
					"players": [
						{
							"username": partyInfo.owner.username,
							"avatar": partyInfo.owner.avatar
						}
					]
				});
				// L'utilisateur créé la room et la rejoint
				socket.join(partyInfo.id);
			});

			socket.on('join party', data => {
				socket.join(data.id);
				let roomInfo = this.parties.get(data.id);
				
				this.parties.set(data.id, {
					"id": data.id,
					"owner": roomInfo.owner,
					"difficulty": roomInfo.difficulty,
					"players": roomInfo.players.concat([{
						"username": data.model.player.name,
						"avatar": data.model.player.avatar.url
					}])
				});

				this.socketServer.to(data.id).emit('un nouveau joueur rejoint la partie', this.parties.get(data.id));
			});

			socket.on('start game', idRoom => {
				this.socketServer.to(idRoom).emit('la partie commence');
			});
		});
	}
}