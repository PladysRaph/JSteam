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

    static verticalPattern(size,delay,isOnTop=true){
        if (isOnTop) {
            return [new Track(0,-1,delay+size),
            new Track(0,1,size)];

        }else{
            return [new Track(0,1,delay+size),
                new Track(0,-1,size)];
        }
    }

    static squareSnakePattern(size,isOnTop=true){
        if(isOnTop){
            return [new Track(0,-1,size*2),
            new Track(-1,0,size),
            new Track(0,1,size*2),new Track(-1,0,size)];
        }else{
            {
                return [new Track(0,1,size*2),
                new Track(-1,0,size),
                new Track(0,-1,size*2),new Track(-1,0,size)];
            }
        }
    }

    static tearPattern(size,isOnTop=true){
        if(isOnTop){
            return[new Track(-0.5,0.5,size*2)
            ,new Track(0,0.5,size*2),new Track(0.5,0.5,size*2),new Track(1,-0.5,size*3),new Track(-1,-0.5,size*3)];
        }else{
            return[new Track(-0.5,-0.5,size)
                ,new Track(0,-0.5,size),new Track(1,-0.5,size),new Track(1,0.5,size*3),new Track(-1,0.5,size*3)];
        }
    }

    static standbyPattern(){
        return [new Track(0,0,1000)];
    }

    static HighArcBulletPattern(size,isOnTop=true){
        if (isOnTop) {
            return [new Track(-1,-1,size),new Track(-1,0,size),new Track(-1,1,size/2),new Track(0,1,size*4)];
        }else{

        }
    }

    static bouncyPattern(size,isOnTop=true){
        if(isOnTop){
            return[new Track(-1,-1,size*2),new Track(-1,0,size*2),new Track(-1,1,size*2),new Track(0,0,size*2)]
        }else{
            return[new Track(-1,1,size*2),new Track(-1,0,size*2),new Track(-1,-1,size*2),new Track(0,0,size*2)];
        }
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