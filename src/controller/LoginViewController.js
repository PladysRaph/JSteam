import Player from "../model/Player.js";
import Avatar from "../model/Avatar.js";
import Controller from "./Controller.js";
import View from '../view/View.js';
import GameView from "../view/GameView.js";
import GameViewController from '../controller/GameViewController.js';

export default class LoginViewController extends Controller {
    
    constructor(model = null) {
        super(model);
    }

    // Générer un ID pour les rooms (ex: AC16XB)
    generateID() {
        let offsets = [
            Math.round(Math.random()*27),
            Math.round(Math.random()*27),
            Math.round(Math.random()*10),
            Math.round(Math.random()*10),
            Math.round(Math.random()*27),
            Math.round(Math.random()*27)
        ]
        let res = '';
        for(let i = 0; i < offsets.length; i++) {
            if(i == 2 || i == 3)
                res += String.fromCharCode(48 + offsets[i]%10);
            else
                res += String.fromCharCode(65 + offsets[i]%26);
        }
        return res;
    }

    // Créer un élement HTML et lui ajouter n attributs
    createElement(element, content, attributes = {}) {
        let elem = document.createElement(element);
        if(content)
            elem.innerHTML = content;
        for(const key in attributes)
            elem.setAttribute(key, attributes[key]);
        return elem;
    }

    // Afficher la boîte de dialogue
    showDialogBox(dialogBox, content) {
        dialogBox.style.display = 'block';
        dialogBox.querySelector('div').innerHTML = content;
    }

    // Cacher la boîte de dialogue
    hideDialogBox(event, dialogBox) {
        if(event.target == dialogBox)
            dialogBox.style.display = 'none';
    }

    // Choisir l'avatar du joueur
    chooseAvatar(img, dialogBox) {
        this.showDialogBox(
            dialogBox,
            `<p>Vous avez choisi le ${img.getAttribute('title')} !</p>`
        );
        return img.getAttribute("src");
    }

    // Initialise le joueur courant
    createUser(username, imgLink) {
        if(username == null || username === '')
            return false;
        this.player = new Player(username, new Avatar(imgLink, 100, 100));
        return true;
    }

    // Démarrer une partie
    startGame(id) {
        this.socketClient.emit('start game', id);
        new GameView(new GameViewController(this.player, this.socketClient, id));
    }

    // Lobby par défaut (sans joueurs)
    defaultLobby(dialogBox, idRoom, isOwner) {
        this.showDialogBox(dialogBox, `
            <p>Voici le code pour inviter vos amis : ${idRoom}</p>
            <p>Les joueurs connectés au lobby :</p>
            <div>
                <table>
                    <tbody>
                    </tbody>
                </table>
            </div>
            ${isOwner ? '<button id="start-game">Commencer la partie</button>' : ''}`);
        window.onclick = undefined;
    }

    addPlayerAtLobby(dialogBox, username, avatar) {
        // Créer une nouvelle ligne dans le tableau
        let tr = this.createElement('tr', null, {
            'id': username
        });

        let tdAvatar = this.createElement('td', null);
        tdAvatar.appendChild(
            this.createElement(
                'img',
                null,
                {
                    'src': avatar,
                    'width': 50
                },
            )
        )
                    
        tr.appendChild(tdAvatar);
        tr.appendChild(this.createElement('td', username));

        dialogBox.querySelector('div table tbody').appendChild(tr);
    }


    // Rejoindre une partie
    joinParty(dialogBox, username, partyID, avatarChoiceUser) {
        if(!this.createUser(username, avatarChoiceUser))
            this.showDialogBox(dialogBox, `<p>Le nom d'utilisateur est vide !</p>`);
        else if(partyID === '')
            this.showDialogBox(dialogBox, `<p>Le code pour rejoindre une partie est vide !</p>`);
        else {
            this.socketClient.emit('join party', {
                "idRoom": partyID.toUpperCase(),
                "model": this.player
            });

            this.socketClient.on('le code de la partie n\'existe pas', () => {
                this.showDialogBox(dialogBox, `<p>Le code de la partie n'existe pas</p>`);
            });

            this.socketClient.on('un joueur a déjà le même pseudo dans le lobby', () => {
                this.showDialogBox(dialogBox, `<p>Un joueur a déjà le même pseudo dans le lobby</p>`);
            });

            this.socketClient.on('un nouveau joueur rejoint la partie', players => {
                this.defaultLobby(dialogBox, partyID, false);
                players.forEach(player => {
                    this.addPlayerAtLobby(dialogBox, player.username, player.avatar);
                });
            });

            this.socketClient.on('déconnexion du lobby', () => {
                dialogBox.style.display = 'none';
                this.showDialogBox(dialogBox, '<p>Vous avez été déconnecté, l\'owner de la partie s\'est déconnecté</p>');
                window.onclick = e => this.hideDialogBox(e, dialogBox);
            })

            this.socketClient.on('la partie commence', () => {
                new GameView(new GameViewController(this.player, this.socketClient, partyID.toUpperCase()));
            })
        }
    }

    // Créer une partie
    createParty(dialogBox, username, avatarChoiceUser, difficulty) {
        if(!this.createUser(username, avatarChoiceUser))
            this.showDialogBox(dialogBox, `<p>Le nom d'utilisateur est vide !</p>`);
        else {
            let id = this.generateID();

            this.socketClient.emit(
                'create party',
                {
                    'id': id,
                    'owner': {
                        'username': username,
                        'avatar': avatarChoiceUser
                    },
                    'difficulty': 'Difficulté' ? 'Facile' : difficulty
                });

            this.defaultLobby(dialogBox, id, true);

            // On ajoute l'owner de la partie au préalable
            this.addPlayerAtLobby(dialogBox, username, avatarChoiceUser);

            this.socketClient.on('un nouveau joueur rejoint la partie', players => {
                let lastPlayer = players.slice(-1)[0];
                this.addPlayerAtLobby(dialogBox, lastPlayer.username, lastPlayer.avatar);
            });

            this.socketClient.on('le joueur quitte le lobby', username => {
                View.mainContent.querySelector(`#${username}`).remove();
            })

            return {
                'id': id,
                'btn': View.mainContent.querySelector('#start-game'),
            }
        }
    }

}