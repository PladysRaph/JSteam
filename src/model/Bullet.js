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
        this.TTLs = new Array();
        this.pathTravelled = new Array();
    }
    
    move(printingIndex) {
        for (let index = 0; index < this.speed; index++) {
            let currentPathMin = 0;
            let currentPathMax = 0;
            for (let index = 0; index < this.pattern.length; index++) {
                currentPathMax += this.pattern[index].frame;
                if (this.pathTravelled[printingIndex] >= currentPathMin && this.pathTravelled[printingIndex] < currentPathMax) {
                    this.arrX[printingIndex] += this.pattern[index].x;
                    this.arrY[printingIndex] += this.pattern[index].y;
                } 
                currentPathMin += this.pattern[index].frame;
            }
            this.pathTravelled[printingIndex]++;
            if (this.pathTravelled[printingIndex] == currentPathMax) 
                this.pathTravelled[printingIndex] = 0;
        }
        this.TTLs[printingIndex]--;
        if (this.TTLs[printingIndex] == 0) this.delete(printingIndex);
    }

    moveAll() {
        if (this.release == this.cooldown) {
            this.pathTravelled.push(0);
            this.arrX.push(this.x);
            this.arrY.push(this.y);
            this.TTLs.push(240);
            this.release = 0;
        }
        for (let index = 0; index < this.arrX.length; index++)
            this.move(index);
        this.release++;
    }

    delete(printingIndex) {
        this.arrX.splice(printingIndex, 1);
        this.arrY.splice(printingIndex, 1);
        this.pathTravelled.splice(printingIndex, 1);
        this.TTLs.splice(printingIndex, 1);
    }

    skipFrame(frame) {
        for (let index = 0; index < frame; index++) {
            this.moveAll();
        }
    }
}