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
        this.socketClient.emit('récuperer le leaderboard');
        this.socketClient.on('leaderboard reçu', json => {
            let html = '';
            let sortedJson = json.sort((player1, player2) => {
                return player2.score - player1.score;
            });
            sortedJson.forEach(player => {
                html += `
                <tr>
                    <td>${player.name}</td>
                    <td>${player.score}</td>
                </tr>
                `
            });
            bodyTable.innerHTML = html;
        });
    }
}