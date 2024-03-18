import assert from 'node:assert/strict';
import {describe, it } from 'node:test';

import Entity from '../model/Entity.js';
import Avatar from '../model/Avatar.js';
import Track from '../model/Track.js';

//test pour verifier la création d'Entity
describe('Create Entity',() =>{
    it('should create a new entity',() =>{
        const entity = new Entity(100, 100, new Avatar('/public/assets/img/pirate-ship.png'),
            [
                new Track(1, -1, 1)
            ]
        );
        //S'assure que l'Entity soit bien créée
        assert.notEqual(entity, null);
        assert.notEqual(entity, undefined);
        // Vérifie que les valeurs soient bien celles attribuées et que les valeurs par défauts ne soient pas null
        assert.equal(entity.x, 100);
        assert.equal(entity.y, 100);
        assert.notEqual(entity.speed, null);
        assert.notEqual(entity.speed, undefined);
        assert.notEqual(entity.pattern, null);
        assert.notEqual(entity.pattern, undefined);
        assert.notEqual(entity.avatar, null);
        assert.notEqual(entity.avatar, undefined);
    }
    )}
)

describe('Displace Entity',() =>{
    it('should displace an entity regarding on its Pattern',() =>{
        const entity = new Entity(200, 200, new Avatar('/public/assets/img/pirate-ship.png'),
            [
                new Track(1, -1, 1)
            ]
        );
        // Vérifie que les valeurs de x et y soient bien modifiées avec le pattern
        entity.skipTime(200);
        assert.equal(entity.x, 400);
        assert.equal(entity.y, 0);
    }
    )}
)