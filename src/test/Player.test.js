import assert from 'node:assert/strict';
import Avatar from '../model/Avatar.js';
import { describe, it } from 'node:test';
import Player from '../model/Player.js';

describe('Create Player', () => {
    it('should create a new player', () => {
        const playerTest = new Player('test',new Avatar('public/assets/img/balloon-ship.png', 100, 100));
        
        //vérifie que l'ennemi a bien été créer
        assert.notEqual(playerTest,undefined);
        assert.notEqual(playerTest,null);

        //vérifie que les variable on bien été initialisé avec les valeurs passés dans le contructeur parents
        assert.equal(playerTest.name, 'test');
        assert.equal(playerTest.avatar.url, 'public/assets/img/balloon-ship.png');
        assert.equal(playerTest.avatar.width, 100);
        assert.equal(playerTest.avatar.height, 100);
        assert.equal(playerTest.x,0);
        assert.equal(playerTest.y,0);

        //vérifie les variables propres a Player sauf les dégats car testé dans Bullet.test.js
        assert.equal(playerTest.hp,100);
        assert.equal(playerTest.xFactor,0);
        assert.equal(playerTest.yFactor,0);
        assert.equal(playerTest.duration,0);
        assert.equal(playerTest.kills,0);
        assert.equal(playerTest.score,0);
        assert.equal(playerTest.isShooting,false);

    })
})
