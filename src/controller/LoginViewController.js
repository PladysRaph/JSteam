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
            return 1;
        }

        this.currentModel = new Player(username, new Avatar(imgLink, 100, 100));

        return 0;
    }

}