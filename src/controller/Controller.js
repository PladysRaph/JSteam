export default class Controller {
    constructor(model) {
		// Modèle du controller (joueur courant)
        this.player = model;
        // Modèle de l'autre joueur (l'autre joueur)
        this.otherModel = null;
    }

    // Mettre à jour le modèle de l'autre joueur (pour le mode multijoueur)
    setOtherModel(model) {
        this.otherModel = model;
    }
}