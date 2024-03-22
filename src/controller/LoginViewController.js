import Player from "../model/Player.js";
import Avatar from "../model/Avatar.js";
import Controller from "./Controller.js";
import GameView from "../view/GameView.js";
import GameViewController from "./GameViewController.js";

export default class LoginViewController extends Controller {

   constructor(model = null) {
    super(model);
   }

    // Afficher la boîte de dialogue
    showDialogBox(dialogBox, content) {
        dialogBox.style.display = 'block';
        dialogBox.querySelector('div').innerHTML = content;
    }

    // Cacher la boîte de dialogue
    hideDialogBox(dialogBox) {
        dialogBox.style.display = 'none';
    }

    // Choisir l'avatar du joueur
    chooseAvatar(img, dialogBox) {
        this.showDialogBox(
            dialogBox,
            `<p>Vous avez choisi le ${img.getAttribute('title')} !</p>`
        );
        return img.getAttribute("src");
    }

    // Initialise le joueur courant
    createUser(username, imgLink) {
        if(username == null || username === '')
            return false;
        this.currentModel = new Player(username, new Avatar(imgLink, 100, 100));
        return true;
    }

    // Démarrer une partie
    joinParty(dialogBox, username, avatarChoiceUser) {
        if(!this.createUser(username, avatarChoiceUser))
            this.showDialogBox(dialogBox, `<p>Le nom d'utilisateur est vide !</p>`);
        else
            new GameView(new GameViewController(this.currentModel));
    }

}