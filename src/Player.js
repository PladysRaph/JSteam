export default class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xFactor = 0;
        this.yFactor = 0;
        this.speed = 1;
    }

    getX() {
        
    }

    setCoords(x, y) {
        this.x = x;
        this.y = y;
    }

    setFactors(xFactor, yFactor) {
        this.xFactor = xFactor;
        this.yFactor = yFactor;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    addFactorX() {

    }
}
