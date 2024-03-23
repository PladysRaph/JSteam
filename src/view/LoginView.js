import LoginViewController from "../controller/LoginViewController.js";
import GameViewController from "../controller/GameViewController.js";
import GameView from "./GameView.js";
import View from "./View.js";

export default class LoginView extends View {
    #avatarChoiceUser
    #avatars
    #username
    #createLobbyBtn
    #joinPartyBtn
    #dialogBox

    constructor(controller) {
        // Initialiser la vue
        super(
            `
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

                            <input type="submit" id="btn-lobby" value="Creer une partie">

                            <div class="dialog-box">
                                <div></div>
                            </div>
                        </div>

                        <input id="pseudo" type='text' placeholder='Entrez votre pseudo'>

                        <input id="party" type='text' placeholder='Code de la partie (ex: AC16XB)' disabled>

                        <input id="join-party-btn" type='submit' value='Rejoindre une partie'>
                    </fieldset>
                </div>
            </form>`, controller);

        
        // Avatar par défaut
        this.#avatarChoiceUser = '/public/assets/img/pirate-ship.png';

        // Élements de la vue
        this.#avatars = View.mainContent.querySelectorAll('#pick-avatar img');
        this.#username = View.mainContent.querySelector('#pseudo');
        this.#createLobbyBtn = View.mainContent.querySelector('#btn-lobby');
        this.#joinPartyBtn = View.mainContent.querySelector('#join-party-btn');
        this.#dialogBox = View.mainContent.querySelector('.dialog-box');
		
        // Écouteur d'évènements
        this.listen();
    }

    listen() {
        this.#createLobbyBtn.addEventListener('click', event => {
            event.preventDefault();
            this.controller.showDialogBox(
                this.#dialogBox,
                `<p>Lobby</p>
                <select>
                    <option disabled selected>Difficulté</option>
                    <option>Facile</option>
                    <option>Moyen</option>
                    <option>Difficile</option>
                </select>`
            );
        });

        this.#avatars.forEach(img => {
            img.addEventListener('click', () => {
                this.#avatarChoiceUser = this.controller.chooseAvatar(img, this.#dialogBox)
            });
        });

        window.addEventListener('click', e => {
            if(e.target == this.#dialogBox)
                this.controller.hideDialogBox(this.#dialogBox);
        })

        // Démarrer une partie
        this.#joinPartyBtn.addEventListener('click', e => {
            e.preventDefault();
            this.controller.joinParty(
                this.#dialogBox,
                this.#username.value,
                this.#avatarChoiceUser
            );
        })
    }

}