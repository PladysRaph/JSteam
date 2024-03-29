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
        let res = [
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
        this.enemies = res;
        return res;
    }

    // Dessiner les Images du joueur
    drawPlayer(ctx) {
        let image = new Image(this.currentModel.avatar.width, this.currentModel.avatar.height);
        image.src = this.currentModel.avatar.url;
        this.drawImage(ctx, image);
        for (let index = 0; index < this.currentModel.bullet.arrX.length; index++) {
            let bulletImg = new Image(this.currentModel.bullet.avatar.width, this.currentModel.bullet.avatar.height);
            bulletImg.src = this.currentModel.bullet.avatar.url;
            this.drawImage(ctx, bulletImg, this.currentModel.bullet.arrX[index], this.currentModel.bullet.arrY[index]); 
        }
        this.currentModel.bullet.moveAll(this.currentModel.isShooting);
    }

    // Desiner les Images des ennemis
    drawEnemies(ctx) {
        this.enemies.forEach(element => {
            let image = new Image(element.avatar.width, element.avatar.height);
            image.src = element.avatar.url;
            this.drawImage(ctx, image, element.x, element.y); 
            element.move();

            for (let index = 0; index < element.bullet.arrX.length; index++) {
                let bulletImg = new Image(element.bullet.avatar.width, element.bullet.avatar.height);
                bulletImg.src = element.bullet.avatar.url;
                this.drawImage(ctx, bulletImg, element.bullet.arrX[index], element.bullet.arrY[index]); 
            }
            element.bullet.moveAll();
        });
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

    // Dessiner la barre de vie
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

        let playerWidth = this.currentModel.avatar.width;
        let playerHeight = this.currentModel.avatar.height;
        this.enemies.forEach(element => {
            // Fait perdre des vies au joueur s'il se fait toucher par l'ennemi ou les balles de l'ennemi
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
            // Fait perdre des vies aux ennemis s'ils sont touchés par les balles du joueur
            for (let index = 0; index < this.currentModel.bullet.arrX.length; index++) {
                if (element.x < this.currentModel.bullet.arrX[index] + this.currentModel.bullet.avatar.width
                    && element.x + element.avatar.width > this.currentModel.bullet.arrX[index]
                    && element.y < this.currentModel.bullet.arrY[index] + this.currentModel.bullet.avatar.height
                    && element.y + element.avatar.height > this.currentModel.bullet.arrY[index]) {
                        this.currentModel.bullet.delete(index);
                        element.hp -= this.currentModel.bullet.damage;
                }
            }
        });

        this.enemies = this.enemies.filter(enemy => {
            if (enemy.hp >= 0) return true;
            else return false;
        });

        // Retour au lobby si toutes les vies sont perdues
        if (this.currentModel.hp <= 0)  {
            new LoginView(new LoginViewController(this.currentModel));
            this.currentModel.hp = 50;
        }
    }

    // Déplacer le joueur en changeant ses coordonnées
    move(canvas) {
        this.currentModel.x += this.currentModel.xFactor;
        this.currentModel.y += this.currentModel.yFactor;
        this.currentModel.bullet.x = this.currentModel.x + this.currentModel.avatar.width;
        this.currentModel.bullet.y = this.currentModel.y + this.currentModel.avatar.height/2;
        this.handleCollisions(canvas);
    }

    // Déplacer les ennemies en changeant leurs coordonnées
    moveEnemies() {
        this.enemies.forEach(element => {
            element.move();
            element.bullet.moveAll();
        });
    }

    // Appuyer sur une touche pour se déplacer et/ou tirer
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
            case 'Space':
                this.currentModel.isShooting = true;
                break;
            default:
                break;
        }
    }

    // Relâche une touche arrêter le déplacement et/ou les tirs
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
            case 'Space':
                this.currentModel.isShooting = false;
                break;
            default:
                break;
        }
    }
}