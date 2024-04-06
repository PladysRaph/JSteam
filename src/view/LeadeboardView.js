import View from "./View.js";

export default class LeaderboardView extends View {
    #indexButton
    #bodyTable

    constructor(controller) {
        super(`
        <a href="#" id="indexButton" class="btn">Revenir a l'ecran de Connexion</a>
        <div id="leaderboard-flex">
            <table>
                <thead>
                    <tr>
                        <th>Nom du joueur</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </tabe>
        </div>
        `, controller);

        this.#indexButton = View.mainContent.querySelector("#indexButton");
        this.#bodyTable = View.mainContent.querySelector("table tbody");
        
        this.controller.fillLeaderBoard(this.#bodyTable);

        this.listen();
    }

    listen() {
        this.#indexButton.addEventListener('click', e => {
            this.controller.backToTitleScreen();
        });
    }
}