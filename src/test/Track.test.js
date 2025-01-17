import assert from 'node:assert/strict';
import {describe, it } from 'node:test';

import Track from '../model/Track.js';

describe('Create Track',() =>{
        it('should create a new vector', () =>{
            const track = new Track(1, -1, 1);

            // Vérifie que le track est bien créé
            assert.notEqual(track, undefined);
            assert.notEqual(track, null);

            // Compare pour vérifier que les valeurs sont bien celles données
            assert.equal(track.x, 1);
            assert.equal(track.y, -1);
            assert.equal(track.frame, 1);
        }
    )}
)
