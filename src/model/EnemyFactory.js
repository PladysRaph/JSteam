import Avatar from "./Avatar.js";
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";
import PatternFactory from "./PatternFactory.js";

export default class EnemyFactory {

    static defaultEnemy(x, y) {
        return new Enemy("sphere1", x, y, 1, 
            new Avatar("/public/assets/img/dark-sphere.png", 64, 64))
    }

    static defaltEnemy(x, y) {
        return new Enemy("sphere1", x, y, 1, 
            new Avatar("/public/assets/img/dark-sphere.png", 64, 64))
    }

    static soho(x, y) {
        return new Enemy("sphere1", x, y, 2, 
            new Avatar("/public/assets/img/dark-sphere.png", 64, 64), 
                PatternFactory.zigzagPattern(140),
            new Bullet(
                'Red pearl bullet', x, y, 20,
                new Avatar('public/assets/img/red-pearl-bullet.png', 16, 16),
                null, 10, 120), 20
            )
    }

    static speedster(x, y) {
        return new Enemy("sphere1", x, y, 20, 
            new Avatar("/public/assets/img/dark-sphere.png", 64, 64), null,
            new Bullet(
                'Red pearl bullet', x, y, 20,
                new Avatar('public/assets/img/red-pearl-bullet.png', 0, 0),
                null, 0, 0), 15
            )
    }
}