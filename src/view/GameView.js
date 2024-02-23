import View from "./View.js";

export default class GameView extends View {
    #currentPlayer
    #canvas;
    #context2D;
    
    constructor(controller) {
        // Initialiser la vue
        super(
            '<canvas class="gameCanvas" width="600" height="400"></canvas>',
            controller
        );

        // Joueur courant (modèle)
        this.#currentPlayer = this.controller.currentModel;

		// Canvas de la vue
        this.#canvas = document.querySelector('.gameCanvas');
        this.#context2D = this.#canvas.getContext('2d');

        // Écoute sur les évènements de cette vue (redimensionnement de fenêtre, touches directionnelles pour contrôler le joueur)
        this.listen();

        // Modifier le déplacement et facteurs de vitesse à intervalle régulier
        setInterval(() => {
            this.#currentPlayer.x += this.#currentPlayer.xFactor;
            this.#currentPlayer.y += this.#currentPlayer.yFactor;
            // Gestion des collisions
            if (this.#currentPlayer.x > this.#canvas.width - this.#currentPlayer.avatar.width) this.#currentPlayer.x = this.#canvas.width - this.#currentPlayer.avatar.width;
            if (this.#currentPlayer.x < 0) this.#currentPlayer.x = 0;
            if (this.#currentPlayer.y > this.#canvas.height - this.#currentPlayer.avatar.height) this.#currentPlayer.y = this.#canvas.height - this.#currentPlayer.avatar.height;
            if (this.#currentPlayer.y < 0) this.#currentPlayer.y = 0;
        });

        // Afficher et synchroniser le rendu de l'image suivant le refresh rate de l'écran (60 FPS / 120 FPS)
        requestAnimationFrame(this.render.bind(this));
    }

    // Écouteur d'évènements de la vue
    listen() {

        // Responsive view (canvas)
        new ResizeObserver(() => {
            this.#canvas.width = this.#canvas.clientWidth;
            this.#canvas.height = this.#canvas.clientHeight;
        }).observe(this.#canvas);

		// Attendre le chargement complet de l'avatar du joueur
		this.#currentPlayer.avatar.addEventListener('load', event => {
			this.#context2D.drawImage(this.#currentPlayer.avatar, this.#currentPlayer.x, this.#currentPlayer.y)
		});

         // Appuyer sur une touche, gestion des multi-touches supporté (haut-droite appuyés en même temps)
        this.controller.keyup();
        
        // Relâcher une touche
        this.controller.keydown();
    }

    // Gérer le rendu de la vue
    render() {
        this.#context2D.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context2D.drawImage(this.#currentPlayer.avatar, this.#currentPlayer.x, this.#currentPlayer.y)
        requestAnimationFrame(this.render.bind(this));
    }

}