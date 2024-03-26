import LoginView from "../view/LoginView";
import Controller from "./Controller";
import LoginViewController from "./LoginViewController";

export default class CreditsViewController extends Controller{
    constructor(model=null){
        super(model);
    }

    //Revenir a l'ecran de connexion
    backToTitleScreen(){
        new LoginView(new LoginViewController);
    }
}