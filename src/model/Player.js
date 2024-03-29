import Entity from './Entity.js'

export default class Player extends Entity {
    constructor(name, avatar) {
        super(name, 0, 0, 2, avatar);
        // Facteurs de vitesse
        this.xFactor = 0;
        this.yFactor = 0;
    }
}
