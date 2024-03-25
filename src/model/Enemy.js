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
        let timeLeft = time;
        while(timeLeft > 0) {
            for (let i = 0; i < this.pattern.length; i++) {
                if (timeLeft - this.pattern[i].time > 0) {
                    xtemp += this.pattern[i].x * this.pattern[i].time;
                    ytemp += this.pattern[i].y * this.pattern[i].time;
                    timeLeft -= this.pattern[i].time;
                } else {
                    xtemp += this.pattern[i].x * timeLeft;
                    ytemp += this.pattern[i].y * timeLeft;
                    timeLeft = 0;
                    break;
                }
            }
        }
        this.x += xtemp;
        this.y += ytemp;
    }
}