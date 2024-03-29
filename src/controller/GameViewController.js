import Avatar from "../model/Avatar.js";
import Enemy from "../model/Enemy.js";
import PatternFactory from "../model/PatternFactory.js";
import Controller from "./Controller.js";
import EnemyFactory from "../model/EnemyFactory.js";
import Bullet from "../model/Bullet.js";
import LoginView from "../view/LoginView.js";
import LoginViewController from "./LoginViewController.js";

export default class GameViewController extends Controller {

    constructor(model) {
        super(model);
        this.enemies = this.generateEnemies();
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
                    PatternFactory.circlePattern(44, 0, false), 5, 20)),

            new Enemy("sphere3", 500, 500, 3, 
                new Avatar("/public/assets/img/dark-sphere.png", 64, 64), 
                PatternFactory.snakePattern(22, 0), 
                new Bullet('Red pearl bullet', 1000, 200, 10,
                    new Avatar('public/assets/img/red-pearl-bullet.png', 16, 16), 
                    PatternFactory.circlePattern(10, 20), 3, 90))
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

    drawHealthbar(context, x, y, width, height){
        context.beginPath();
        context.strokestyle="black";
        context.lineWidth = 3;
        context.rect(x-1, y-1, width+3, height+3);
        context.stroke();
        context.closePath();
        context.beginPath();
        let value = this.currentModel.hp/50;
        context.rect(x, y, width*value, height);
        if(value > 0.63){
            context.fillStyle="green"
        }else if(value > 0.37){
            context.fillStyle="gold"
        }else if(value > 0.13){
            context.fillStyle="orange";
        }else{
            context.fillStyle="red";
        }
        context.closePath();
        context.fill();
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


        // Définir un ratio d'hitbox pour les collisions
        let hitbox = 0.8;

        // Vérifier que le joueur ne touche ni un ennemi ni une balle
        let playerWidth = this.currentModel.avatar.width;
        let playerHeight = this.currentModel.avatar.height;
        this.enemies.forEach(element => {
            if (this.currentModel.x + playerWidth * ((1-hitbox)/2) < element.x + element.avatar.width
                && this.currentModel.x + playerWidth * ((1+hitbox)/2) > element.x
                && this.currentModel.y + playerHeight * ((1-hitbox)/2) < element.y + element.avatar.height
                && this.currentModel.y + playerHeight * ((1+hitbox)/2) > element.y) {
                    this.currentModel.hp--;
                }
            for (let index = 0; index < element.bullet.arrX.length; index++) {
                if (this.currentModel.x < element.bullet.arrX[index] + element.bullet.avatar.width
                    && this.currentModel.x + this.currentModel.avatar.width > element.bullet.arrX[index]
                    && this.currentModel.y < element.bullet.arrY[index] + element.bullet.avatar.height
                    && this.currentModel.y + this.currentModel.avatar.height > element.bullet.arrY[index]) {
                        element.bullet.delete(index);
                        this.currentModel.hp -= element.bullet.damage;
                }
            }
        });
        if (this.currentModel.hp <= 0)  {
            new LoginView(new LoginViewController(this.currentModel));
            this.currentModel.hp = 50;
        }
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