import Avatar from "./Avatar.js";
import Enemy from "./Enemy.js";

export default class EnemyFactory {
    static defaultEnemy(x, y) {
        return new Enemy("sphere1", x, y, 1, 
            new Avatar("/public/assets/img/dark-sphere.png", 64, 64))
    }
}