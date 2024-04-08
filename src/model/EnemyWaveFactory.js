import EnemyFactory from "./EnemyFactory.js";

export default class EnemyWaveFactory {
    static index = 0;
    static turns = 0;

    static nextWave() {
        if (EnemyWaveFactory.index > 5) {
            EnemyWaveFactory.index = 0;
            EnemyWaveFactory.turns++;
        }

        let res;
        switch (EnemyWaveFactory.index) {
            case 0:
                res = EnemyWaveFactory.wave1();
                break;
            case 1:
                res = EnemyWaveFactory.wave2();
                break;
            case 2:
                res =EnemyWaveFactory.wave3();
                break;
            case 3:
                res = EnemyWaveFactory.wave4();
                break;
            case 4:
                res = EnemyFactory.wave5();
                break;
            case 5:
                res = EnemyFactory.wave6();
                break;
                default:
                res = EnemyWaveFactory.wave1();
                break;
        }
        EnemyWaveFactory.index++;
        return res;
    }

    static wave1() {
        return [
            EnemyFactory.speedster(1500, 100),
            EnemyFactory.soho(1500, 200),
            EnemyFactory.uther(1500, 300),
            EnemyFactory.kayn(1500, 400),
            EnemyFactory.belvet(1500, 500)
        ];
    }

    static wave2() {
        return [
            EnemyFactory.speedster(1500, 100),
            EnemyFactory.speedster(1500, 500),
            EnemyFactory.speedster(1500, 900)
        ];
    }
    static wave3(){
        return [
            EnemyFactory.falco(1500,500),
            EnemyFactory.collei(1200,600,false),
            EnemyFactory.pong(900,300),
            EnemyFactory.ziggs(1200,300)
        ];
    }

    static wave4(){
        return [
            EnemyFactory.zane(1300,100),
            EnemyFactory.zane(1300,650),
            EnemyFactory.uther(1000,375),
            EnemyFactory.belvet(1400,375)
        ];
    }
    static wave5(){
        return [
            EnemyFactory.collei(1200,100),
            EnemyFactory.collei(1200,600,false),
            EnemyFactory.pong(1100,100,false),
            EnemyFactory.pong(1100,600)
        ];
    }

    static wave6(){
        return [
            EnemyFactory.falco(1300,100,false),
            EnemyFactory.falco(1300,600),
            EnemyFactory.ziggs(1300,300),
            EnemyFactory.uther(1150,200),
            EnemyFactory.uther(1150,400)
        ]
    }
}