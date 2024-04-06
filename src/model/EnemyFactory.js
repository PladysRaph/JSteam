import Avatar from "./Avatar.js";
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js";
import PatternFactory from "./PatternFactory.js";
import EnemyWaveFactory from "./EnemyWaveFactory.js";

export default class EnemyFactory {
    static difficulty = 0;

    static belvet(x, y) {
        return EnemyFactory.makeEnemy("belvet", x, y, 20, 1, 10, 1,
        new Avatar('public/assets/img/belvet.png', 48, 48));
    }

    static uther(x, y) {
        return EnemyFactory.makeEnemy("uther", x, y, 75, 10, 130, 1,
        new Avatar('public/assets/img/uther.png', 64, 64));
    }

    static soho(x, y) {
        return EnemyFactory.makeEnemy("soho", x, y, 20, 10, 65, 2,
            new Avatar('public/assets/img/soho.png', 64, 64),
            PatternFactory.zigzagPattern(140));
    }

    static speedster(x, y) {
        return EnemyFactory.makeEnemy("speedster", x, y, 15, 0, 0, 20,
            new Avatar('public/assets/img/speedster.png', 64, 32), null,
            new Avatar('public/assets/img/red-pearl-bullet.png', 0, 0));
    }

    static kayn(x, y) {
        return EnemyFactory.makeEnemy("kayn", x, y, 25, 25, 130, 10,
            new Avatar('public/assets/img/kayn.png', 32, 64),
            PatternFactory.zigzagPattern(90));
    }

    static makeEnemy(name, x, y, hp, damage, cooldown, speed, avatar, enemyPattern = null,
        bulletAvatar = new Avatar('public/assets/img/red-pearl-bullet.png', 16, 16)) {
        return new Enemy(name, x, y, speed, avatar, enemyPattern,
            new Bullet('Red pearl bullet', x, y, 20, bulletAvatar, null, 
                damage*(1+EnemyFactory.difficulty*0.5)*(1+EnemyWaveFactory.turns*0.3), 
                cooldown), 
            hp
        )
    }
}