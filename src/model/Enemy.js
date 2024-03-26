import Entity from './Entity.js'
import Track from './Track.js';

export default class Enemy extends Entity {
    constructor(name, x, y, speed, avatar, pattern = null) {
        super(name, x, y, speed, avatar);
        // Pattern de déplacement
        if (pattern == null || !Array.isArray(pattern)) {
            this.pattern = [new Track(-1, 0, 1)];
        }
        else
            this.pattern = pattern;
        console.log(this.pattern);
        this.pathTravelled = 0;
    }

    // Effectue le pattern comme si l'Enemy avait bougé pendant time frames, permet de tester le déplacement
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

    //Déplace l'Enemy sur son Track dépendemment de sa vitesse
    move() {
        for (let index = 0; index < this.speed; index++) {
            let currentPathMin = 0;
            let currentPathMax = 0;
            for (let index = 0; index < this.pattern.length; index++) {
                currentPathMax += this.pattern[index].time;
                if (this.pathTravelled >= currentPathMin && this.pathTravelled < currentPathMax) {
                    this.x += this.pattern[index].x;
                    this.y += this.pattern[index].y;
                } 
                currentPathMin += this.pattern[index].time;
            }
            this.pathTravelled++;
            if (this.pathTravelled == currentPathMax) 
                this.pathTravelled = 0;
        }
    }
}