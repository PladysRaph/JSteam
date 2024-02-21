import Player from"../Player.js";

export default class PlayerView {
    #player;
    
    constructor(player) {
        this.#player = player;
        const image = new Image();
        image.src = '/assets/img/New Piskel.png';

        this.listen();

        image.addEventListener('load', event => {
            context.drawImage(image, this.#player.getX(), this.#player.y);
        });

        setInterval(() => {
            this.#player.x += this.#player.xFactor;
            this.#player.y += this.#player.yFactor;
        });

        requestAnimationFrame(render);
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
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, x, y);
        requestAnimationFrame(render);
    }

}