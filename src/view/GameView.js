import Avatar from "../model/Avatar.js";
import View from "./View.js";
import Bullet from "../model/Bullet.js";
import Player from "../model/Player.js";
import GameViewController from "../controller/GameViewController.js";
import ObjectMapper from "../utils/ObjectMapper.js";

export default class GameView extends View {
    static interval;
    #avatarImage;
    #canvas;
    #context2D;
    
    constructor(controller) {
        // Initialiser la vue
        super(
            '<canvas class="gameCanvas" width="600" height="400"></canvas>',
            controller
        );

		// Créer l'avatar du joueur
		this.#avatarImage = this.controller.generateHTMLAvatar();

        this.otherPlayers = new Map();
		
		// Canvas de la vue
        this.#canvas = View.mainContent.querySelector('.gameCanvas');
        this.#context2D = this.#canvas.getContext('2d');

        // Écoute sur les évènements de cette vue (redimensionnement de fenêtre, touches directionnelles pour contrôler le joueur)
        this.listen();

        GameView.interval = setInterval(() => this.controller.move(this.#canvas), 1000/60);

        // Afficher et synchroniser le rendu de l'image suivant le refresh rate de l'écran (60 FPS / 120 FPS)
        requestAnimationFrame(this.render.bind(this));
    }

    // Écouteur d'évènements de la vue
    listen() {

        // Responsive view (canvas)
        new ResizeObserver(() => this.controller.resizeCanvas(this.#canvas)).observe(this.#canvas);

		// Attendre le chargement complet de l'avatar du joueur
		this.#avatarImage.addEventListener('load', event => {
			this.controller.drawImage(this.#context2D, this.#avatarImage);
		});

        // Appuyer sur une touche, gestion des multi-touches supporté (haut-droite appuyés en même temps)
        addEventListener('keydown', e => {
            this.controller.keydown(e.code);
        });

        // Relâcher une touche
        addEventListener('keyup', e => {
            this.controller.keyup(e.code);
        });

		// On réinstancie car socket.io ne déserialise pas entièrement l'object Player (il manque les méthodes fournies par cette méthode)
        this.controller.socketClient.on("le joueur a fait une action", player => {
            this.controller.damagingPlayer(0.8, player);
            this.otherPlayers.set(player.name, ObjectMapper.deserialize(player, Player));
	        this.controller.damagingEnemies(this.otherPlayers.get(player.name));
        });
        
        this.controller.socketClient.on("le joueur se déconnecte", username => {
            this.otherPlayers.delete(username);
        });
    }

    // Gérer le rendu de la vue
    render() {
        this.#context2D.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.controller.drawEnemies(this.#context2D);
        let index = 0;
		for(let [key, value] of this.otherPlayers) {
            index++;
			this.controller.drawPlayer(this.#context2D, value);
            this.controller.drawHealthbar(this.#context2D, value.x, value.y + value.avatar.width + 10, value.avatar.width, 8, value.hp);
        }
        this.controller.drawPlayer(this.#context2D);
        this.controller.drawHealthbar(this.#context2D, 10, 10, 210, 20);
        if (GameViewController.gameIsOn) 
            requestAnimationFrame(this.render.bind(this));
    }

}
