import CreditsViewController from "../controller/CreditsViewController.js";
import CreditsView from "./CreditsView.js";
import View from "./View.js";

export default class LoginView extends View {
    #avatarChoiceUser
    #avatars
    #username
    #party
    #difficulty
    #createPartyBtn
    #joinPartyBtn
    #retryPartyBtn
    #dialogBox
    #creditsButton

    constructor(controller) {
        // Initialiser la vue
        super(
            `          
            <a href="index.html" id="creditsButton">Credits</a>
            <form id="loginForm" method='post'>
                <div id="flex">
                    <fieldset>
                        <legend>JSteam, un 'Shoot Them Up' ambiance Steam Punk en JS !</legend>

                        <div id="avatar">
                            <p>Choisissez votre avatar</p>
                            <div id="pick-avatar">
                                <img src="/public/assets/img/balloon-ship.png" title="Ballon ship" width=50 height=50 />
                                <img src="/public/assets/img/pirate-ship.png" title="Pirate ship" width=50 height=50 />
                                <img src="/public/assets/img/transport-ship.png" title="Transport ship" width=50 height=50 />
                            </div>

                            <div class="dialog-box">
                                <div></div>
                            </div>
                        </div>

                        <input id="pseudo" type='text' placeholder='Entrez votre pseudo'>

                        <input id="party" type='text' placeholder='Code de la partie (ex: AC16XB)' maxlength="6">

                        <select id="difficulty">
                            <option disabled selected>Difficulté</option>
                            <option>Facile</option>
                            <option>Moyen</option>
                            <option>Difficile</option>
                        </select>

                        <div id="flex-btn-div">
                            <input id="join-party-btn" type='submit' value='Rejoindre une partie'>
                            <input id="create-party-btn" type='submit' value='Creer une partie'>
                        </div>
                    </fieldset>
                </div>
            </form>`, controller);

        // Avatar par défaut
        this.#avatarChoiceUser = '/public/assets/img/pirate-ship.png';

        // Élements de la vue
        this.#avatars = View.mainContent.querySelectorAll('#pick-avatar img');
        this.#username = View.mainContent.querySelector('#pseudo');
        this.#party = View.mainContent.querySelector('#party');
        this.#difficulty = View.mainContent.querySelector('#difficulty');
        this.#joinPartyBtn = View.mainContent.querySelector('#join-party-btn');
        this.#createPartyBtn = View.mainContent.querySelector('#create-party-btn');
        this.#dialogBox = View.mainContent.querySelector('.dialog-box');
		this.#creditsButton= View.mainContent.querySelector('#creditsButton');

        // Dans le cas où le joueur perd une partie, il peut la rejouer (si elle existe toujours)
        if(this.controller.idRoomToRetry != null) {
            this.controller.showDialogBox(
                this.#dialogBox,
                `
                <p>Vous avez perdu '${this.controller.player.name}', voici vos statistiques de la partie :</p>
                <table>
                    <thead>
                    <tr>
                        <th>Stat 1</th>
                        <td>Valeur 1</td>
                    </tr>
                    <tr>
                        <th>Stat 2</th>
                        <td>Valeur 2</td>
                    </tr>
                    <tr>
                        <th>Stat 3</th>
                        <td>Valeur 3</td>
                    </tr>
                    </thead>
                </table>
                <input id="retry-party-btn" type='submit' value='Recommencer'>
                `
            );
            this.#retryPartyBtn = View.mainContent.querySelector('#retry-party-btn');
        }
        
        // Écouteur d'évènements
        this.listen();
    }

    listen() {
        // Système de sélection d'avatar
        this.#avatars.forEach(img => {
            img.addEventListener('click', () => {
                this.#avatarChoiceUser = this.controller.chooseAvatar(img, this.#dialogBox)
            });
        });

        // Cacher la boîte de dialogue
        window.onclick = e => this.controller.hideDialogBox(e, this.#dialogBox);

        // Démarrer une partie
        this.#joinPartyBtn.addEventListener('click', e => {
            e.preventDefault();
            this.controller.joinParty(
                this.#dialogBox,
                this.#username.value,
                this.#party.value,
                this.#avatarChoiceUser
            );
        })

        // ou recommencer une partie
        if(this.controller.idRoomToRetry != null) {
            this.#retryPartyBtn.addEventListener('click', e => {
                e.preventDefault();
                this.controller.joinParty(
                    this.#dialogBox,
                    this.controller.player.name,
                    this.controller.idRoomToRetry,
                    this.controller.player.avatar.url
                );
            });
        }

        // Créer une partie
        this.#createPartyBtn.addEventListener('click', e => {
            e.preventDefault();
            let {id, btn} = this.controller.createParty(
                this.#dialogBox,
                this.#username.value,
                this.#avatarChoiceUser,
                this.#difficulty.value
            );
            btn.addEventListener('click', e => {
                e.preventDefault();
                this.controller.startGame(id)
            });
        });

        //affiche les credits
        this.#creditsButton.addEventListener('click', e => {
            e.preventDefault();
            new CreditsView(new CreditsViewController());
        });
    }

}