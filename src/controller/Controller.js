export default class Controller {
    constructor(model, socketClient) {
		// Modèle du controller (joueur courant)
        this.player = model;
        this.socketClient = socketClient;
    }
}