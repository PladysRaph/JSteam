import LoginViewController from "../controller/LoginViewController.js";
import GameViewController from "../controller/GameViewController.js";
import GameView from "./GameView.js";
import View from "./View.js";

export default class LoginView extends View {
	#controller;

    constructor(controller) {
        // Initialiser la vue
        super(
            `
            <form id="loginForm" method='post'>
                <div id="flex">
                    <fieldset>
                        <legend>Bienvenue dans JSteam, un 'Shoot Them Up' ambiance Steam Punk</legend>

                        <div id="avatar">
                            <p>Choisissez votre avatar</p>
                            <div id="pick-avatar">`

                            +

                                `<img src="/public/assets/img/balloon-ship.png" title="Ballon ship" width=50 height=50 />
                                <img src="/public/assets/img/pirate-ship.png" title="Pirate ship" width=50 height=50 />
                                <img src="/public/assets/img/transport-ship.png" title="Transport ship" width=50 height=50 />`

                                +

                            `</div>
                        </div>

                        <input id="pseudo" type='text' placeholder='Entrez votre pseudo'>

                        <input id="server" type='text' placeholder='Adresse IP:[Port]' disabled>

                        <select>
                            <option disabled selected>Difficulté</option>
                            <option>Facile</option>
                            <option>Moyen</option>
                            <option>Difficile</option>
                        </select>

                        <input type='submit' value='Se connecter'>
                    </fieldset>
                </div>
            </form>`, controller);
		
        // Écouteur d'évènements
        this.listen();
    }

    listen() {
        let imgLink = '/public/assets/img/pirate-ship.png';
        let imgs = View.mainContent.querySelectorAll('#pick-avatar img');

        imgs.forEach(img => {
            img.addEventListener('click', () => {
                imgLink = img.getAttribute("src");
                alert(`Vous avez choisi le ${img.getAttribute('title')} !`);
            })
        });

        console.log(imgLink);

        // Écouter sur l'envoi d'une requête
        View.mainContent.querySelector("input[type='submit']").addEventListener('click', e => {
            e.preventDefault();

            // Si la création d'un utilisateur s'effectue avec succès
            if(this.controller.createUser(View.mainContent.querySelector('#pseudo').value, imgLink))
                new GameView(new GameViewController(this.controller.currentModel));
        })
    }

}