import Track from "./Track.js";

export default class PatternFactory {
    static defaultPattern() {
        return [new Track(-1, 0, 1)];
    }

    static circlePattern(size, delay, isOnTop = true) {
        if (isOnTop) {
            return [
                new Track(-1, 0, delay+size), 
                new Track(-1, -1, size), 
                new Track(0, -1, size), 
                new Track(1, -1, size), 
                new Track(1, 0, size), 
                new Track(1, 1, size), 
                new Track(0, 1, size),  
                new Track(-1, 1, size)
            ]
        }
        return [
            new Track(-1, 0, delay+size), 
            new Track(-1, 1, size), 
            new Track(0, 1, size), 
            new Track(1, 1, size), 
            new Track(1, 0, size), 
            new Track(1, -1, size), 
            new Track(0, -1, size),  
            new Track(-1, -1, size)
        ] 
    }

    static snakePattern(size, delay, isOnTop = true) {
        if (isOnTop) {
            return [
                new Track(-1, 0, delay), 
                new Track(0, -1, size), 
                new Track(-1, 0, delay), 
                new Track(0, 1, size)
            ]
        }
        return [
            new Track(-1, 0, delay), 
            new Track(0, 1, size), 
            new Track(-1, 0, delay), 
            new Track(0, -1, size)
        ] 
    }

    static zigzagPattern(size, isOnTop = true) {
        if (isOnTop) {
            return [
                new Track(-1, -1, size), 
                new Track(-1, 1, size)
            ]
        }
        return [
            new Track(-1, 1, size), 
            new Track(-1, -1, size)
        ] 
    }
}