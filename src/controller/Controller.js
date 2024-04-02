import { io } from 'socket.io-client'; 

export default class Controller {
    constructor(model, socketClient = io()) {
		// Modèle du controller (joueur courant)
        this.player = model;
        // Modèle de l'autre joueur (l'autre joueur)
        this.otherModel = null;
        this.socketClient = socketClient;
    }

    // Mettre à jour le modèle de l'autre joueur (pour le mode multijoueur)
    setOtherModel(model) {
        this.otherModel = model;
    }
}