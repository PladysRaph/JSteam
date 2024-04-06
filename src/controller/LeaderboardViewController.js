import Controller from "./Controller.js";
import Router from "../utils/Router.js";

export default class LeaderboardViewController extends Controller {
    
    constructor(model, socketClient) {
        super(model, socketClient);
    }

    // Revenir a l'ecran de connexion
    backToTitleScreen() {
        Router.navigate('/', [null, null, this.socketClient]);
    }

    fillLeaderBoard(bodyTable) {
        this.socketClient.on('récuperer le leaderboard', html => {
            bodyTable.innerHTML = html;
        });
    }
}