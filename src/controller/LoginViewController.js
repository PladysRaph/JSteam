import Player from "../model/Player.js";
import Avatar from "../model/Avatar.js";
import Controller from "./Controller.js";

export default class LoginViewController extends Controller {

   constructor(model = null) {
    super(model);
   }

    // Initialiser un nouveau joueur qui se connecte à une partie
    createUser(username, imgLink) {
        if(username == null || username === '') {
            alert("Nom d'utilisateur vide");
            return false;
        }

        // À changer...
        let avatar = Avatar.renderImage(imgLink);

        this.currentModel = new Player(username, avatar);

        return true;
    }

}