import Track from "./Track.js";

export default class Entity {
    name;
    x;
    y;
    speed;
    avatar;
    pattern;

    constructor(name, x, y, speed, avatar, pattern){
        this.name=name;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.avatar = avatar;
        if (!Array.isArray(pattern)) {
            this.pattern = [
                new Track(-1, 0, 1)
            ]
        } else this.pattern=pattern;
    }

    skipTime(time) {
        var xtemp = 0;
        var ytemp = 0;
        for (let index = 0; index < this.pattern.length; index++) {
            xtemp += this.pattern[index].x;
            ytemp += this.pattern[index].y;
            
        }
        this.x += xtemp*time;
        this.y += ytemp*time;
    }

}