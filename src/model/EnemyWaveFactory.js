import EnemyFactory from "./EnemyFactory.js";

export default class EnemyWaveFactory {
    static index = 0;
    static turns = 0;

    static nextWave() {
        if (EnemyWaveFactory.index > 1) {
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
}