import Entity from './Entity.js';
import PatternFactory from './PatternFactory.js';
import Track from './Track.js';

export default class Bullet extends Entity {
    constructor(name, x, y, speed, avatar, pattern = null, damage, cooldown) {
        super(name, x, y, speed, avatar);
        if (pattern == null || !Array.isArray(pattern))
            this.pattern = PatternFactory.defaultPattern();
        else
            this.pattern = pattern;
        this.damage = damage;
        this.cooldown = cooldown;
        this.release = cooldown;
        this.arrX = new Array();
        this.arrY = new Array();
        this.timeToLive = 200;
        this.pathTravelled = new Array();
    }
    
    move(printingIndex) {
        for (let index = 0; index < this.speed; index++) {
            let currentPathMin = 0;
            let currentPathMax = 0;
            for (let index = 0; index < this.pattern.length; index++) {
                currentPathMax += this.pattern[index].time;
                if (this.pathTravelled[printingIndex] >= currentPathMin && this.pathTravelled[printingIndex] < currentPathMax) {
                    this.arrX[printingIndex] += this.pattern[index].x;
                    this.arrY[printingIndex] += this.pattern[index].y;
                } 
                currentPathMin += this.pattern[index].time;
            }
            this.pathTravelled[printingIndex]++;
            if (this.pathTravelled[printingIndex] == currentPathMax) 
                this.pathTravelled[printingIndex] = 0;
        }
    }

    moveAll() {
        if (this.release == this.cooldown) {
            this.pathTravelled.push(0);
            this.arrX.push(this.x);
            this.arrY.push(this.y);
            if (this.timeToLive == 0) {
                this.arrX.shift();
                this.arrY.shift();
                this.pathTravelled.shift();
            }
            this.release = 0;
        }
        for (let index = 0; index < this.arrX.length; index++)
            this.move(index);
        this.release++;
        if (this.timeToLive != 0) this.timeToLive--;
    }

    skipTime(time) {
        for (let index = 0; index < time; index++) {
            this.moveAll();
        }
    }
}