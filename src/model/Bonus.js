import Entity from "./Entity.js";

export default class Bonus extends Entity {
    constructor(avatar, x, y) {
        super(null, x, y, null, avatar);
    }
}