import LoginView from "../view/LoginView.js";
import Controller from "./Controller.js";
import LoginViewController from "./LoginViewController.js";

export default class CreditsViewController extends Controller{
    constructor(model = null){
        super(model);
    }

    //Revenir a l'ecran de connexion
    backToTitleScreen(){
        new LoginView(new LoginViewController());
    }
}