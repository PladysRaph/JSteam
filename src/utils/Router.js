import CreditsView from '../view/CreditsView.js'
import CreditsViewController from '../controller/CreditsViewController.js'
import LoginView from '../view/LoginView.js';
import LoginViewController from '../controller/LoginViewController.js';
import GameView from '../view/GameView.js';
import GameViewController from '../controller/GameViewController.js';

export default class Router {

    static navigate(path, args = []) {
        switch(path) {
            case '/':
                new LoginView(Reflect.construct(LoginViewController, args));
                break;
            case '/credits':
                new CreditsView(Reflect.construct(CreditsViewController, args));
                break;
            case '/game':
                new GameView(Reflect.construct(GameViewController, args));
                // Remplacer '/game' par l'id de la room 
                path = args[2];
                break;
            default:
                break;
        }
        history.pushState(null, "", path);
    }
}