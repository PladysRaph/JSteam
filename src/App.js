import LoginView from './view/LoginView.js';
import LoginViewController from './controller/LoginViewController.js';
import Player from './model/Player.js';
import Avatar from './model/Avatar.js';
import Bullet from './model/Bullet.js';

// Affichage de la vue 'Login'
new LoginView(new LoginViewController());

// let swap = (arr, idx1, idx2) => {
//     let tmp = arr[idx2];
//     list[idx2] = list[idx1];
//     list[idx1] = b;
// }

// let player = new Player(
//     "machin",
//     new Avatar("avatar", 150, 150),
//     new Bullet(
//         "bullet",
//         1,1,1,new Avatar("avatar 2", 150, 150),null,10, 5,[],[],[],[]
//     ),
//     1,1,50,false
// );

// let keys = Object.keys(player);
// let values = Object.values(player);

// console.log(keys);
// console.log(values);