import Avatar from './Avatar.js';
import Bullet from './Bullet.js';
import Entity from './Entity.js'

export default class Player extends Entity {
    constructor(name, avatar, bullet = null) {
        super(name, 0, 0, 2, avatar);
        // PVs du joueur
        this.hp = 50;
        // Facteurs de vitesse
        this.xFactor = 0;
        this.yFactor = 0;
        // Balle qu'utilise le joueur
        if (bullet == null) 
            this.bullet = new Bullet('Red pearl bullet', this.x, this.y, 10,
                new Avatar('public/assets/img/red-pearl-bullet.png', 16, 16),
                null, 1, 50);
        else this.bullet = bullet;
    }
}
