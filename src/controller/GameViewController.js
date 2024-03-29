import Avatar from "../model/Avatar.js";
import Enemy from "../model/Enemy.js";
import PatternFactory from "../model/PatternFactory.js";
import Controller from "./Controller.js";
import EnemyFactory from "../model/EnemyFactory.js";
import Bullet from "../model/Bullet.js";

export default class GameViewController extends Controller {

    constructor(model) {
        super(model);
    }

    // Redimensionner le canvas (responsive-design)
    resizeCanvas(canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    // Générer l'avatar en HTML
    generateHTMLAvatar() {
        let image = new Image(this.currentModel.avatar.width, this.currentModel.avatar.height);
        image.src = this.currentModel.avatar.url;
        return image;
    }

    // Générer des ennemis
    generateEnemies() {
        return [
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
                    PatternFactory.circlePattern(10, 20), 1, 90))
        ];
    }

    // Dessiner une image
    drawImage(canvas, img, x = this.currentModel.x, y = this.currentModel.y) {
        canvas.drawImage(
            img,
            x,
            y,
            img.width,
            img.height);
    }

    // Gestion des collisions
    handleCollisions(canvas) {
        // Vérifier que le joueur ne dépasse pas le cadre vers la droite / bas
        if (this.currentModel.x > canvas.width - this.currentModel.avatar.width)
            this.currentModel.x = canvas.width - this.currentModel.avatar.width;

        if (this.currentModel.y > canvas.height - this.currentModel.avatar.height)
            this.currentModel.y = canvas.height - this.currentModel.avatar.height;
        
        // Vérifier que le  joueur ne dépasse pas le cadre vers la gauche / haut
        if (this.currentModel.x < 0) this.currentModel.x = 0;
        if (this.currentModel.y < 0) this.currentModel.y = 0;
    }

    // Déplacer le joueur en changeant ses coordonnées
    move(canvas) {
        this.currentModel.x += this.currentModel.xFactor;
        this.currentModel.y += this.currentModel.yFactor;
        this.handleCollisions(canvas);
    }

    // Appuyer sur une touche pour se déplacer
    keydown(keyCode) {
        switch (keyCode) {
            case 'KeyD':
                this.currentModel.xFactor = this.currentModel.speed;
                break;
            case 'KeyA':
                this.currentModel.xFactor = -this.currentModel.speed;
                break;
            case 'KeyW':
                this.currentModel.yFactor = -this.currentModel.speed;
                break;
            case 'KeyS':
                this.currentModel.yFactor = this.currentModel.speed;
                break;
            default:
                break;
        }
    }

    // Relâche une touche arrêter le déplacement
    keyup(keyCode) {
        switch (keyCode) {
            case 'KeyD':
                this.currentModel.xFactor = 0;
                break;
            case 'KeyA':
                this.currentModel.xFactor = 0;
                break;
            case 'KeyW':
                this.currentModel.yFactor = 0;
                break;
            case 'KeyS':
                this.currentModel.yFactor = 0
                break;
            default:
                break;
        }
    }
}