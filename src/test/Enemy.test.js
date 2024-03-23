import assert from 'node:assert/strict';
import {describe, it } from 'node:test';

import Ennemy from '../model/Enemy.js';
import Avatar from '../model/Avatar.js'
import Track from '../model/Track.js'

describe('Create Ennemy',() => {
        it('shoud create new ennemy', () =>{
            const enemy1 = new Ennemy(
                'Monster 1',
                new Avatar('public/assets/img/balloon-ship.png', 100, 100),
                0, 0,
                1,
                null);
            const track = new Track(-1, 0, 1);

            // Vérifie que e est bien crée
            assert.notEqual(enemy1, undefined);
            assert.notEqual(enemy1, null);

            // Compare pour vérifier que les valeurs sont bien celles données
            assert.equal(enemy1.name, 'Monster 1');
            assert.equal(enemy1.avatar.url, 'public/assets/img/balloon-ship.png');
            assert.equal(enemy1.avatar.width, 100);
            assert.equal(enemy1.avatar.height, 100);
            assert.equal(enemy1.x, 0);
            assert.equal(enemy1.y, 0);
            assert.equal(enemy1.pattern[0].x, track.x);
            assert.equal(enemy1.pattern[0].y, track.y);
            assert.equal(enemy1.pattern[0].time, track.time);
        }
    )}
)

