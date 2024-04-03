import Avatar from "../model/Avatar.js";
import Enemy from "../model/Enemy.js";
import PatternFactory from "../model/PatternFactory.js";
import Controller from "./Controller.js";
import EnemyFactory from "../model/EnemyFactory.js";
import Bullet from "../model/Bullet.js";
import LoginView from "../view/LoginView.js";
import LoginViewController from "./LoginViewController.js";

export default class GameViewController extends Controller {
    otherModels;

    constructor(model, socketClient) {
        super(model, socketClient);
        this.enemies = this.generateEnemies();
    }

    // Redimensionner le canvas (responsive-design)
    resizeCanvas(canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    // Générer l'avatar en HTML
    generateHTMLAvatar() {
        let image = new Image(this.player.avatar.width, this.player.avatar.height);
        image.src = this.player.avatar.url;
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
    drawPlayer(ctx, player = this.player) {
        let image = new Image(player.avatar.width, player.avatar.height);
        image.src = player.avatar.url;
        ctx.fillStyle = 'blue'
        ctx.font = "20px m6x11";
        ctx.fillText(player.name, player.x+10, player.y-10);
        this.drawImage(ctx, image, player.x, player.y);
        this.drawBullets(ctx, player);
        player.bullet.moveAll(player.isShooting);
    }

    // Desiner les Images des ennemis
    drawEnemies(ctx) {
        this.enemies.forEach(element => {
            let image = new Image(element.avatar.width, element.avatar.height);
            image.src = element.avatar.url;
            this.drawImage(ctx, image, element.x, element.y); 
            element.move();
            this.drawBullets(ctx, element);
            element.bullet.moveAll();
        });
    }

    // Dessiner les Images des balles qu'une entité possède
    drawBullets(ctx, entity = this.player) {
        let bullet = entity.bullet;
        for (let index = 0; index < bullet.arrX.length; index++) {
            let bulletImg = new Image(bullet.avatar.width, bullet.avatar.height);
            bulletImg.src = bullet.avatar.url;
            this.drawImage(ctx, bulletImg, bullet.arrX[index], bullet.arrY[index]); 
        }
    }

    // Dessiner une image
    drawImage(canvas, img, x = this.player.x, y = this.player.y) {
        canvas.drawImage(
            img,
            x,
            y,
            img.width,
            img.height);
    }

    // Dessiner la barre de vie
    drawHealthbar(context, x, y, width, height, hp = this.player.hp){
        context.beginPath();
        context.strokestyle="black";
        context.lineWidth = 3;
        context.rect(x-1, y-1, width+3, height+3);
        context.stroke();
        context.closePath();
        context.beginPath();
        const value = hp/50;
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

    // Vérifier que le joueur ne sorte pas du canvas
    noPlayerOutOfBound(canvas, player =  this.player) {
        const avatar = player.avatar;
        // Vérifier que le joueur ne dépasse pas le cadre vers la droite / bas
        if (player.x > canvas.width - avatar.width)
            player.x = canvas.width - avatar.width;
        if (player.y > canvas.height - avatar.height)
            player.y = canvas.height - avatar.height;
        
        // Vérifier que le  joueur ne dépasse pas le cadre vers la gauche / haut
        if (player.x < 0) player.x = 0;
        if (player.y < 0) player.y = 0;
    }

    // Applique les dégâts au joueur s'il rentre en collision avec des entités adverses
    damagingPlayer(hitbox, player = this.player) {
        this.enemies.forEach(enemy => {
            // Fait perdre des vies au joueur s'il se fait toucher par l'ennemi
            if (this.isCollisionning(player, enemy, null, hitbox)) 
                player.hp--;
            const bullet = enemy.bullet;
            // Fait perdre des vies au joueur s'il se fait toucher par les balles de l'ennemi
            for (let index = 0; index < bullet.arrX.length; index++) {
                if (this.isCollisionning(player, bullet, index)) {
                    bullet.delete(index);
                    player.hp -= bullet.damage;
                }
            }
        });
    }

    // Répond vrai si les deux entités se superposent.
    // Si un index est précisé, on considère que la deuxième entité est un tableau de coordonnées
    isCollisionning(entity1, entity2, index = null, hitbox1 = 1, hitbox2 = 1) {
        const avatar1 = entity1.avatar;
        const avatar2 = entity2.avatar;
        let entity2x;
        let entity2y;
        if (index == null) {
            entity2x = entity2.x;
            entity2y = entity2.y;
        } else {
            entity2x = entity2.arrX[index];
            entity2y = entity2.arrY[index];
        }
        return entity1.x + avatar1.width * ((1-hitbox1)/2) < entity2x + avatar2.width * ((1+hitbox2)/2)
            && entity1.x + avatar1.width * ((1+hitbox1)/2) > entity2x + avatar2.width * ((1-hitbox2)/2)
            && entity1.y + avatar1.height * ((1-hitbox1)/2) < entity2y + avatar2.height * ((1+hitbox2)/2)
            && entity1.y + avatar1.height * ((1+hitbox1)/2) > entity2y + avatar2.height * ((1-hitbox2)/2);
    }

    // Applique les dégâts aux ennemis s'ils rentre en collision avec les balles du joueur
    damagingEnemies(player = this.player) {
        this.enemies.forEach(enemy => {
            const bullet = player.bullet;
            for (let index = 0; index < bullet.arrX.length; index++) {
                if (enemy.x < bullet.arrX[index] + bullet.avatar.width
                    && enemy.x + enemy.avatar.width > bullet.arrX[index]
                    && enemy.y < bullet.arrY[index] + bullet.avatar.height
                    && enemy.y + enemy.avatar.height > bullet.arrY[index]) {
                        bullet.delete(index);
                        enemy.hp -= bullet.damage;
                }
            }
        });
    }

    // Gestion des collisions
    handleCollisions(canvas) {
        this.noPlayerOutOfBound(canvas);

        let hitbox = 0.8;
        this.damagingPlayer(hitbox);
        this.damagingEnemies();
        
        // Enlève les ennemis morts
        this.enemies = this.enemies.filter(enemy => {
            if (enemy.hp >= 0) return true;
            else return false;
        });

        // Retour au lobby si toutes les vies sont perdues ou si tous les ennemis sont morts
        if (this.player.hp <= 0  || this.enemies.length == 0)  {
            this.enemies = [EnemyFactory.defaultEnemy()];
            this.player.hp = 50;
            new LoginView(new LoginViewController(this.player));
        }
    }

    // Déplacer le joueur en changeant ses coordonnées
    move(canvas) {
        this.player.x += this.player.xFactor;
        this.player.y += this.player.yFactor;
        this.player.bullet.x = this.player.x + this.player.avatar.width;
        this.player.bullet.y = this.player.y + this.player.avatar.height/2;
        this.socketClient.emit("action du joueur", this.player);
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
                this.player.xFactor = this.player.speed;
                break;
            case 'KeyA':
                this.player.xFactor = -this.player.speed;
                break;
            case 'KeyW':
                this.player.yFactor = -this.player.speed;
                break;
            case 'KeyS':
                this.player.yFactor = this.player.speed;
                break;
            case 'Space':
                this.player.isShooting = true;
                break;
            default:
                break;
        }
    }

    // Relâche une touche arrêter le déplacement et/ou les tirs
    keyup(keyCode) {
        switch (keyCode) {
            case 'KeyD':
                this.player.xFactor = 0;
                break;
            case 'KeyA':
                this.player.xFactor = 0;
                break;
            case 'KeyW':
                this.player.yFactor = 0;
                break;
            case 'KeyS':
                this.player.yFactor = 0
                break;
            case 'Space':
                this.player.isShooting = false;
                break;
            default:
                break;
        }
    }
}