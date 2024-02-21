import View from "./View.js";

export default class PlayerView extends View {
    #player;
    
    constructor(player) {
        super();
        this.#player = player;

        // Attendre le chargement complet de l'avatar
        this.#player.avatar.addEventListener('load', event => View.context2D.drawImage(this.#player.avatar, this.#player.x, this.#player.y));

        // Écoute sur les évènements de cette vue (touches directionnelles pour contrôler le joueur)
        this.listen();

        // Modifier le déplacement et facteurs de vitesse à intervalle régulier
        setInterval(() => {
            this.#player.x += this.#player.xFactor;
            this.#player.y += this.#player.yFactor;
            // Gestion des collisions
            if (this.#player.x > View.canvas.width - this.#player.avatar.width) this.#player.x = View.canvas.width - this.#player.avatar.width;
            if (this.#player.x < 0) this.#player.x = 0;
            if (this.#player.y > View.canvas.height - this.#player.avatar.height) this.#player.y = View.canvas.height - this.#player.avatar.height;
            if (this.#player.y < 0) this.#player.y = 0;
        });

        // Afficher et synchroniser le rendu de l'image suivant le refresh rate de l'écran (60 FPS / 120 FPS)
        requestAnimationFrame(this.render.bind(this));
    }

    // Écouteur d'évènements de la vue
    listen() {
        // Appuyer sur une touche, gestion des multi-touches supporté (haut-droite appuyés en même temps)
        addEventListener('keydown', e => {
            switch (e.code) {
                case 'ArrowRight':
                    this.#player.xFactor = this.#player.speed;
                    break;
                case 'ArrowLeft':
                    this.#player.xFactor = -this.#player.speed;
                    break;
                case 'ArrowUp':
                    this.#player.yFactor = -this.#player.speed;
                    break;
                case 'ArrowDown':
                    this.#player.yFactor = this.#player.speed;
                    break;
                default:
                    break;
            }
        });

        // Relâcher une touche
        addEventListener('keyup', e => {
            switch (e.code) {
                case 'ArrowRight':
                    this.#player.xFactor = 0;
                    break;
                case 'ArrowLeft':
                    this.#player.xFactor = 0;
                    break;
                case 'ArrowUp':
                    this.#player.yFactor = 0;
                    break;
                case 'ArrowDown':
                    this.#player.yFactor = 0
                    break;
                default:
                    break;
            }
        });
    }

    // Gérer le rendu de la vue
    render() {
        View.context2D.clearRect(0, 0, View.canvas.width, View.canvas.height);
        View.context2D.drawImage(this.#player.avatar, this.#player.x, this.#player.y)
        requestAnimationFrame(this.render.bind(this));
    }

}