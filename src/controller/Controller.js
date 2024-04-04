import { io } from 'socket.io-client'; 

export default class Controller {
    constructor(model, socketClient = io()) {
		// Modèle du controller (joueur courant)
        this.player = model;
        this.socketClient = socketClient;
    }
}