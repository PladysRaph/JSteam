import View from "./View.js";

export default class PlayerView extends View {
    #player;
    #avatar;
    
    constructor(player) {
        super();
        this.#player = player;
        
        const image = new Image();
        image.src = '/assets/img/New Piskel.png';

        this.#avatar = image;

        this.listen();

        image.addEventListener('load', event => {
            this.context2D.drawImage(image, this.#player.x, this.#player.y);
        });

        setInterval(() => {
            this.#player.x += this.#player.xFactor;
            this.#player.y += this.#player.yFactor;
        });

        requestAnimationFrame(this.render);
    }

    listen() {
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

    render() {
        View.context2D.clearRect(0, 0, View.context2D.width, View.context2D.height);
        View.context2D.drawImage(this.#avatar, this.#player.x, this.#player.y);
        requestAnimationFrame(this.render);
    }

}