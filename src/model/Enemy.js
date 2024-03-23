import Entity from './Entity.js'
import Track from './Track.js';

export default class Enemy extends Entity {
    constructor(name, avatar, x, y, speed, pattern = null) {
        super(name, x, y, speed, avatar);
        // Pattern de déplacement
        if (!Array.isArray(pattern))
            this.pattern = [new Track(-1, 0, 1)]
        else
            this.pattern = pattern;
    }

    skipTime(time) {
        let xtemp = 0;
        let ytemp = 0;
        for (let i = 0; i < this.pattern.length; i++) {
            xtemp += this.pattern[i].x;
            ytemp += this.pattern[i].y;
        }
        this.x += xtemp*time;
        this.y += ytemp*time;
    }
}