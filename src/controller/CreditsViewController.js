import Controller from "./Controller.js";
import Router from "../utils/Router.js";

export default class CreditsViewController extends Controller {
    constructor(model, socketClient){
        super(model, socketClient);
    }

    // Revenir à l'écran de connexion
    backToTitleScreen() {
        Router.navigate('/', [null, null, this.socketClient]);
    }
}