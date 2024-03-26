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
        for (let index = 0; index < time; index++) {
            this.move();
        }
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