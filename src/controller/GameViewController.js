import Controller from "./Controller.js";

export default class GameViewController extends Controller {

    constructor(model) {
        super(model);
    }

    // Appuyer sur une touche
    keydown() {
        addEventListener('keydown', e => {
            switch (e.code) {
                case 'ArrowRight':
                    this.currentModel.xFactor = this.currentModel.speed;
                    break;
                case 'ArrowLeft':
                    this.currentModel.xFactor = -this.currentModel.speed;
                    break;
                case 'ArrowUp':
                    this.currentModel.yFactor = -this.currentModel.speed;
                    break;
                case 'ArrowDown':
                    this.currentModel.yFactor = this.currentModel.speed;
                    break;
                default:
                    break;
            }
        });
    }

    // Relâche une touche
    keyup() {
        addEventListener('keyup', e => {
            switch (e.code) {
                case 'ArrowRight':
                    this.currentModel.xFactor = 0;
                    break;
                case 'ArrowLeft':
                    this.currentModel.xFactor = 0;
                    break;
                case 'ArrowUp':
                    this.currentModel.yFactor = 0;
                    break;
                case 'ArrowDown':
                    this.currentModel.yFactor = 0
                    break;
                default:
                    break;
            }
        });
    }

    
}