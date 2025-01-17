import { io } from 'socket.io-client';
import Controller from "./Controller.js";
import Enemy from "../model/Enemy.js";
import EnemyFactory from "../model/EnemyFactory.js";
import ObjectMapper from "../utils/ObjectMapper.js";
import EnemyWaveFactory from "../model/EnemyWaveFactory.js";
import Router from "../utils/Router.js";
import Bonus from "../model/Bonus.js";
import Avatar from "../model/Avatar.js";

export default class GameViewController extends Controller {
    static gameIsOn = true;

    constructor(model, socketClient, idRoom, enemies, difficulty) {
        super(model, socketClient);
        this.enemies = enemies == null ? this.generateEnemies() : enemies.map(enemy => {
            return ObjectMapper.deserialize(enemy, Enemy);
        });
        this.bonuses = new Array();
        this.idRoom = idRoom;
        GameViewController.gameIsOn = true;
        switch (difficulty) {
            case "Moyen":
                EnemyFactory.difficulty = 1;
                break;
            case "Difficile":
                EnemyFactory.difficulty = 2;
                break;
            default:
                break;
        }
        this.bgX = 0;
        this.bgY = -82;
        this.bgUp = true;
        this.wwX = 1;
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
        let res = EnemyWaveFactory.nextWave();
        this.enemies = res;
        return res;
    }

    drawWaveWarning(canvas, context) {
        let image = new Image(1000, 400);
        image.src = 'public/assets/img/wave_background.png';
        let xVector = canvas.width * this.wwX;
        if (xVector > 4) this.wwX *= 0.96;
        if (this.wwX < 0.05) this.wwX -= 0.0001;
        if (xVector < 0) this.wwX /= 0.96;
        let x = (canvas.width-image.width)/2+xVector;
        let y = (canvas.height-image.height)/2;
        this.drawImage(context, image, x, y); 
        context.fillStyle = 'black';
        context.font = "64px Arial Black";
        context.fillText("La vague suivante arrive !", x+50, y+210);
        context.fillStyle = 'white';
        context.font = "24px Arial Black";
        context.fillText("Dernière vague : " + (EnemyWaveFactory.index), x+590, y+35);
        context.fillStyle = 'Gold';
        context.fillText("Tour actuel : " + (EnemyWaveFactory.turns+1), x+620, y+70);
        context.fillStyle = 'Grey';
        context.fillText("Score et dégâts subits +" + (100*(1+EnemyFactory.difficulty*0.5)*(1+EnemyWaveFactory.turns*0.3)-100) + "%", x+320, y+360);
        if (canvas.width+xVector <= 0) {
            this.wwX = 1;
            this.nextWave();
            return true;
        }
        return false;
    }

    //dessine le background et update sa position
    drawScrollingBackground(canvas, context) {
        if (this.bgX + canvas.width <= 0)  this.bgX = 0;
        let image = new Image(canvas.width, canvas.height+158);
        image.src = 'public/assets/img/wallpaper_login.png';
        this.drawImage(context, image, this.bgX, this.bgY);
        this.drawImage(context, image, canvas.width-1 + this.bgX, this.bgY);
        this.bgX -= 0.5;
        if (this.bgUp) this.bgY += 0.05;
        else this.bgY -= 0.05;
        if (this.bgY >= -1) this.bgUp = false;
        if (this.bgY <= -157) this.bgUp = true;
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
        const value = hp/100;
        context.rect(x, y, width*value, height);
        if(value > 0.63)
            context.fillStyle="green"
        else if(value > 0.37)
            context.fillStyle="gold"
        else if(value > 0.13)
            context.fillStyle="orange";
        else
            context.fillStyle="red";
        context.closePath();
        context.fill();
    }

    // Affiche la duration, les kills et le score du joueur
    drawStats(context, x, y, player = this.player) {
        context.fillStyle = 'black';
        context.font = "15px";
        context.fillText("Time : " + parseInt(this.player.duration/60, 10), x, y);
        context.fillStyle = 'red';
        context.fillText("Kills : " + this.player.kill, x, y+20);
        context.fillStyle = 'blue';
        context.fillText("Score : " + this.player.score, x, y+40);
    }

    // Affiche tous les bonus
    drawBonuses(context) {
        this.bonuses.forEach(element => this.drawBonus(context, element));
    }

    // Affiche un bonus
    drawBonus(context, bonus) {
        let image = new Image(bonus.avatar.width, bonus.avatar.height);
        image.src = bonus.avatar.url;
        this.drawImage(context, image, bonus.x, bonus.y); 
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

    takingBonuses(player = this.player) {
        this.bonuses.forEach(bonus => {
            if (this.isCollisionning(player, bonus)) { 
                this.bonuses.pop(bonus);
                if (this.player.hp <= 70) this.player.hp += 30;
                else this.player.hp = 100;
            }
        });
    }

    // Applique les dégâts au joueur s'il rentre en collision avec des entités adverses
    damagingPlayer(hitbox, player = this.player) {
        this.enemies.forEach(enemy => {
            // Fait perdre des vies au joueur s'il se fait toucher par l'ennemi
            if (this.isCollisionning(player, enemy, null, hitbox)) { 
                player.hp = 0;
                enemy.hp = 0;
            }
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
            if (enemy.hp <= 0) {
                player.score += parseInt(player.duration*(1+EnemyFactory.difficulty*0.5)*(1+EnemyWaveFactory.turns*0.3), 10);
                player.kill++;
                if (Math.random() < 0.1) this.bonuses.push(new Bonus(new Avatar('public/assets/img/secai-de-oins.png', 50, 50), enemy.x, enemy.y));
            }
        });
    }

    // Gestion des collisions
    handleCollisions(canvas) {
        this.noPlayerOutOfBound(canvas);

        let hitbox = 0.8;
        this.damagingPlayer(hitbox);
        this.damagingEnemies();
        this.takingBonuses();
        
        // Enlève les ennemis morts
        this.enemies = this.enemies.filter(enemy => {
            return enemy.hp > 0 && enemy.x > 0;
        });

        // Retour au lobby si toutes les vies sont perdues
        if (this.player.hp <= 0)  {
            this.player.hp = 100;
            GameViewController.gameIsOn = false;
            this.socketClient.emit('envoyer les stats du joueur au serveur', this.player, () => {
                this.socketClient.disconnect();
            });
            Router.navigate('/', [this.player, this.idRoom, io()]);
            EnemyWaveFactory.turns = 0;
            EnemyWaveFactory.index = 0;
        }

        if (this.enemies.length <= 0) this.socketClient.emit('prochaine vague', this.idRoom, EnemyWaveFactory.index, EnemyWaveFactory.turns);
    }

    // Passe à la prochaine vague
    nextWave() {
        this.enemies = EnemyWaveFactory.nextWave();
    }

    // Déplacer le joueur en changeant ses coordonnées
    move(canvas) {
        this.player.x += this.player.xFactor;
        this.player.y += this.player.yFactor;
        this.player.bullet.x = this.player.x + this.player.avatar.width;
        this.player.bullet.y = this.player.y + this.player.avatar.height/2;
        this.socketClient.emit("action du joueur", this.player, this.enemies, this.idRoom);
        this.player.duration++;
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