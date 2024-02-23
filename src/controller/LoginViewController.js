import Player from "../model/Player.js";
import Avatar from "../model/Avatar.js";
import Controller from "./Controller.js";

export default class LoginViewController extends Controller {

   constructor(model) {
    super(model);
   }

    // Initialiser un nouveau joueur qui se connecte à une partie
    createUser(main) {
        let username = main.querySelector('#pseudo').value;

        if(username == null || username === '') {
            alert("Nom d'utilisateur vide");
            return false;
        }
        
        // À changer...
        let avatar = Avatar.renderImage("../../assets/img/New Piskel.png");

        this.currentModel = new Player(username, avatar);

        return true;
    }

}