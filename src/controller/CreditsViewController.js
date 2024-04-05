import Controller from "./Controller.js";
import Router from "../utils/Router.js";

export default class CreditsViewController extends Controller{
    constructor(model = null){
        super(model);
    }

    //Revenir a l'ecran de connexion
    backToTitleScreen() {
        Router.navigate('/');
    }
}