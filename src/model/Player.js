import Avatar from './Avatar.js';
import Bullet from './Bullet.js';
import Entity from './Entity.js'
import Track from './Track.js';

export default class Player extends Entity {
    constructor(name, avatar, bullet = null, x = 0, y = 0, hp = 100, isShooting = false, score = 0) {
        super(name, x, y, 5, avatar);
        // PVs du joueur
        this.hp = hp;
        // Facteurs de vitesse
        this.xFactor = 0;
        this.yFactor = 0;
        // Balle qu'utilise le joueur
        let damage = 5;
        if (bullet == null) 
            this.bullet = new Bullet('Red pearl bullet', this.x, this.y - this.avatar.height/2, 10,
                new Avatar('public/assets/img/red-pearl-bullet.png', 16, 16),
                [new Track(1, 0, 1)], damage, 20);
        else this.bullet = bullet;
        // Durée de jeu du joueur
        this.duration = 0;
        // Nombre de kills
        this.kills = 0;
        // Indique si le joueur est en train de tirer
        this.isShooting = isShooting;
        // Score du joueur
        this.score = score;
    }
}
