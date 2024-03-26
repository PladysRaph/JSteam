import LoginView from './view/LoginView.js';
import LoginViewController from './controller/LoginViewController.js';
import CreditsView from './view/CreditsView.js';
import CreditsViewController from './controller/CreditsViewController.js';
// Affichage de la vue 'Login'
new LoginView(new LoginViewController());
//new CreditsView(new CreditsViewController());