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

        this.#enemies = [
            EnemyFactory.defaultEnemy(1500, 300),

            new Enemy("sphere2", 1000, 200, 5,
                new Avatar("/public/assets/img/dark-sphere.png", 64, 64), 
                PatternFactory.circlePattern(22, 0, false), 
                new Bullet('Red pearl bullet', 1000, 200, 10,
                    new Avatar('public/assets/img/red-pearl-bullet.png', 16, 16), 
                    PatternFactory.circlePattern(44, 0, false), 1, 20)),

            new Enemy("sphere3", 500, 500, 3, 
                new Avatar("/public/assets/img/dark-sphere.png", 64, 64), 
                PatternFactory.snakePattern(22, 0), 
                new Bullet('Red pearl bullet', 1000, 200, 10,
                    new Avatar('public/assets/img/red-pearl-bullet.png', 16, 16), 
                    PatternFactory.circlePattern(10, 20), 1, 90))];

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
            let image = new Image(element.avatar.width, element.avatar.height);
            image.src = element.avatar.url;
            this.controller.drawImage(this.#context2D, image, element.x, element.y); 
            element.move();

            for (let index = 0; index < element.bullet.arrX.length; index++) {
                let bulletImg = new Image(element.bullet.avatar.width, element.bullet.avatar.height);
                bulletImg.src = element.bullet.avatar.url;
                this.controller.drawImage(this.#context2D, bulletImg, element.bullet.arrX[index], element.bullet.arrY[index]); 
            }
            element.bullet.moveAll();
        });

        requestAnimationFrame(this.render.bind(this));
    }

}