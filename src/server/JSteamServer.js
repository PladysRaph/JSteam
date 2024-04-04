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

	getParty(idRoom) {
		return this.parties.get(idRoom);
	}

	setParty(idRoom, started, socket_id_owner, difficulty, players) {
		this.parties.set(idRoom, {
			"id": idRoom,
			"started": started,
			"socket_id_owner": socket_id_owner,
			"difficulty": difficulty,
			"players": players
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

	playerDisconnects(socket, currentRoom) {
		let player = currentRoom.players.filter(player => player.socket_id == socket.id);
		if(player.length != 0) {
			this.setParty(
				currentRoom.id,
				currentRoom.started,
				socket.id,
				currentRoom.difficulty,
				currentRoom.players.filter(p => p.socket_id != socket.id)
			);
			return player[0];
		}
		return null;
	}

	handleSocketConnection() {
		this.socketServer.on('connection', socket => {

			socket.on('create party', partyInfo => {
				this.setParty(
					partyInfo.id,
					false,
					socket.id,
					partyInfo.difficulty,
					[
						{
							"username": partyInfo.owner.username,
							"avatar": partyInfo.owner.avatar,
							"socket_id": socket.id
						}
					]
				)
				// L'utilisateur créé la room et la rejoint
				socket.join(partyInfo.id);
			});

			socket.on('join party', data => {
				// Vérifie si la room existe suivant le code donné
				if(!this.isExists(data.idRoom, Array.from(this.parties.keys()), 'id_room'))
					socket.emit('le code de la partie n\'existe pas');
				// Vérifie que le pseudo n'est pas déjà prit dans la partie qu'on tente de rejoindre
				else if(this.isExists(data.model.name, this.parties.get(data.idRoom).players, 'username'))
					socket.emit('un joueur a déjà le même pseudo dans le lobby');
				else {
					socket.join(data.idRoom);
					let currentRoom = this.getParty(data.idRoom);
					this.setParty(
						data.idRoom,
						currentRoom.started,
						currentRoom.socket_id_owner,
						currentRoom.difficulty,
						currentRoom.players.concat([{
							"username": data.model.name,
							"avatar": data.model.avatar.url,
							"socket_id": socket.id
						}])
					);
					// Si la partie a déjà commencé
					if(currentRoom.started)
						this.socketServer.to(data.idRoom).emit('la partie commence');
					else
						this.socketServer.to(data.idRoom).emit('un nouveau joueur rejoint la partie', this.getParty(data.idRoom).players);
				}
			});

			socket.on('start game', idRoom => {
				let currentRoom = this.parties.get(idRoom);
				this.setParty(
					idRoom,
					true,
					socket.id,
					currentRoom.difficulty,
					currentRoom.players
				);
				this.socketServer.to(idRoom).emit('la partie commence');
			});

			socket.on("action du joueur", player => {
				for(let [key, value] of this.parties)
					if(value.players.filter(p => p.username == player.name).length != 0)
						socket.to(key).emit("le joueur a fait une action", player);
			});

			socket.on("disconnect", () => {
				console.log("déconnexion");
				let roomId;
				let isOwner = false;

				for(let [key, value] of this.parties) {
					let currentRoom = this.getParty(key);
					if(currentRoom.started) {
						if(value.socket_id_owner == socket.id) {
							roomId = key;
					 		isOwner = true;
					 		this.socketServer.to(roomId).emit('déconnexion en pleine partie');
							break;
						} else {
							let player = this.playerDisconnects(socket, currentRoom);
							if(player != null) 
								this.socketServer.to(key).emit("le joueur se déconnecte", player.username);
						}
					} 
					else {
					 	if(value.socket_id_owner == socket.id) {
					 		roomId = key;
					 		isOwner = true;
					 		this.socketServer.to(roomId).emit('déconnexion de la partie');
							break;
					 	} else {
							let player = this.playerDisconnects(socket, currentRoom);
							if(player != null) 
								this.socketServer.to(key).emit("le joueur quitte le lobby", player.username);
						}
					}
				}

				// Si la partie n'a pas encore commencé et que l'owner s'est déconnecté
				if(isOwner)
					this.parties.delete(roomId);
			});
		});
	}
}