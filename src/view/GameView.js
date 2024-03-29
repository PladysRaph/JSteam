import Avatar from "../model/Avatar.js";
import Enemy from "../model/Enemy.js";
import Track from "../model/Track.js";
import View from "./View.js";
import Bullet from "../model/Bullet.js";
import EnemyFactory from "../model/EnemyFactory.js";
import PatternFactory from "../model/PatternFactory.js";

export default class GameView extends View {
    #avatarImage;
    #canvas;
    #context2D;
    #enemies;
    
    constructor(controller) {
        // Initialiser la vue
        super(
            '<canvas class="gameCanvas" width="600" height="400"></canvas>',
            controller
        );

		// Créer l'avatar du joueur
		this.#avatarImage = this.controller.generateHTMLAvatar();
		
		// Canvas de la vue
        this.#canvas = View.mainContent.querySelector('.gameCanvas');
        this.#context2D = this.#canvas.getContext('2d');

        // Créer les ennemis
        this.#enemies = this.controller.enemies;

        // Écoute sur les évènements de cette vue (redimensionnement de fenêtre, touches directionnelles pour contrôler le joueur)
        this.listen();

        // Modifier le déplacement et facteurs de vitesse à intervalle régulier
        setInterval(() => this.controller.move(this.#canvas));

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
    }

    // Gérer le rendu de la vue
    render() {
        this.#context2D.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.controller.drawImage(this.#context2D, this.#avatarImage);

        this.#enemies.forEach(element => {
            this.controller.drawImage(
                this.#context2D,
                this.controller.generateHTMLAvatar(
                    element.avatar.width,
                    element.avatar.height,
                    element.avatar.url),
                element.x,
                element.y); 

            element.move();

            for (let index = 0; index < element.bullet.arrX.length; index++) {
                this.controller.drawImage(
                    this.#context2D,
                    this.controller.generateHTMLAvatar(
                        element.bullet.avatar.width,
                        element.bullet.avatar.height,
                        element.bullet.avatar.url),
                    element.bullet.arrX[index],
                    element.bullet.arrY[index]); 
            }
            element.bullet.moveAll();
        });

        this.controller.drawHealthbar(this.#context2D, 10, 10, 210, 20);

        requestAnimationFrame(this.render.bind(this));
    }

}