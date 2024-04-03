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

	// Vérifie si le code de la partie ou le username existe
	isExists(element, elements, typeElement) {
		for(let i = 0; i < elements.length; i++) {
			if(typeElement == 'username') {
				if(elements[i].username == element)
					return true;
			} else {
				if(elements[i] == element)
					return true;
			}
		}
		return false;
	}

	handleSocketConnection() {
		this.socketServer.on('connection', socket => {

			socket.on('create party', partyInfo => {
				this.parties.set(partyInfo.id, {
					"id": partyInfo.id,
					"started": false,
					"socket_id_owner": socket.id,
					"owner": partyInfo.owner,
					"difficulty": partyInfo.difficulty,
					"players": [
						{
							"username": partyInfo.owner.username,
							"avatar": partyInfo.owner.avatar,
						}
					]
				});
				// L'utilisateur créé la room et la rejoint
				socket.join(partyInfo.id);
			});

			socket.on('join party', data => {
				if(!this.isExists(data.id, Array.from(this.parties.keys()), 'id_room'))
					this.socketServer.emit('le code de la partie n\'existe pas');
				else if(this.isExists(data.model.player.name, this.parties.get(data.id).players, 'username'))
					this.socketServer.emit('un joueur a déjà le même pseudo dans le lobby');
				else {
					socket.join(data.id);
					let roomInfo = this.parties.get(data.id);

					this.parties.set(data.id, {
						"id": data.id,
						"started": data.started,
						"socket_id_owner": roomInfo.socket_id_owner,
						"owner": roomInfo.owner,
						"difficulty": roomInfo.difficulty,
						"players": roomInfo.players.concat([{
							"username": data.model.player.name,
							"avatar": data.model.player.avatar.url
						}])
					});

					// Si la partie a déjà commencé
					if(roomInfo.started)
						this.socketServer.to(data.id).emit('la partie commence');
					else
						this.socketServer.to(data.id).emit('un nouveau joueur rejoint la partie', this.parties.get(data.id));
				}
			});

			socket.on('start game', idRoom => {
				let partyInfo = this.parties.get(idRoom);
				this.parties.set(partyInfo.id, {
					"id": partyInfo.id,
					"started": true,
					"socket_id_owner": socket.id,
					"owner": partyInfo.owner,
					"difficulty": partyInfo.difficulty,
					"players": partyInfo.players
				});
				this.socketServer.to(idRoom).emit('la partie commence');
			});

			socket.on("action du joueur", player => {
				for(let [key, value] of this.parties) {
					if(value.players.filter(p => p.username == player.name).length != 0) {
						socket.to(key).emit("le joueur a fait une action", player);
					}
				}
			});

			socket.on("disconnect", () => {
				let isOwner = false;
				let roomId;
				for(let [key, value] of this.parties) {
					if(value.socket_id_owner == socket.id) {
						roomId = key;
						isOwner = true;
						this.socketServer.to(key).emit('déconnexion de la partie');
					}
				}
				if(isOwner)
					this.parties.delete(roomId);
			});
		});
	}
}