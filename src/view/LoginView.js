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
                        <legend>Bienvenue dans le Jeu Super Addictif et Elegant (JSaE)</legend>

                        <div id="avatar">
                            <p>Choisissez votre avatar</p>
                            <div id="pick-avatar">`

                            +

                                `<img src="../../assets/img/avatar-pick.jpg" width=50 height=50 />
                                <img src="../../assets/img/New Piskel.png" width=50 height=50 />`

                                +

                            `</div>
                        </div>

                        <input id="pseudo" type='text' placeholder='Entrez votre pseudo'>

                        <input id="server" type='text' placeholder='Adresse IP:[Port]' disabled>

                        <input type='submit' value='Se connecter'>
                    </fieldset>
                </div>
            </form>`, controller);
		
        // Écouteur d'évènements
        this.listen();
    }

    listen() {

        let imgLink;
        this.mainContent.querySelectorAll('#pick-avatar img').forEach(element => {
            element.addEventListener('click', () => {
                imgLink = element.getAttribute("src");
            })
        });
        // Écouter sur l'envoi d'une requête
        this.mainContent.querySelector("input[type='submit']").addEventListener('click', e => {
            e.preventDefault();
            
            // Si la création d'un utilisateur s'effectue avec succès
            if(this.controller.createUser(this.mainContent, imgLink))
                new GameView(new GameViewController(this.controller.currentModel));
        })
    }

}