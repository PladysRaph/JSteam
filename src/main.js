import LoginView from './view/LoginView.js';
import LoginViewController from './controller/LoginViewController.js';

// Affichage de la vue 'Login'
// Le modèle est null à ce moment de l'éxecution car l'utilisateur n'est pas encore créé
new LoginView(new LoginViewController(null));