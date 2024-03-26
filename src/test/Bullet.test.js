import assert from 'node:assert/strict';
import {describe, it } from 'node:test';

import Ennemy from '../model/Enemy.js';
import Avatar from '../model/Avatar.js'
import Track from '../model/Track.js'

describe('Create Bullet',() => {
        it('shoud create new bullet', () =>{
            const bullet = new Bullet(
                'Bullet 1', 0, 0, 10,
                new Avatar('public/assets/img/red-pearl-bullet.png', 32, 32),
                null);

            // Vérifie que bulllet est bien créé
            assert.notEqual(bullet, undefined);
            assert.notEqual(bullet, null);

            // Compare pour vérifier que les valeurs sont bien celles données
            assert.equal(bullet.name, 'Bullet 1');
            assert.equal(bullet.avatar.url, 'public/assets/img/red-pearl-bullet.png');
            assert.equal(bullet.avatar.width, 32);
            assert.equal(bullet.avatar.height, 32);
            assert.equal(bullet.x, 0);
            assert.equal(bullet.y, 0);
            assert.equal(bullet.pattern[0].x, -1);
            assert.equal(bullet.pattern[0].y, 0);
            assert.equal(bullet.pattern[0].time, 1);
        }
    )}
)

describe('Displace Bullet',() => {
    it('shoud displace a bullet', () =>{
        const bullet = new Ennemy(
            'Bullet 1', 200, 0, 1,
            new Avatar('public/assets/img/red-pearl-bullet.png', 32, 32),
            null);

        // Vérifie la position de base du bullet
        assert.equal(bullet.x, 200);
        assert.equal(bullet.y, 0);

        // Déplace le bullet comme s'il avait bougé pendant 100 frames puis vérifie que le déplacement a bien été effectué
        bullet.skipTime(100);
        assert.equal(bullet.x, 100);
        assert.equal(bullet.y, 0);
    }
)}
)

