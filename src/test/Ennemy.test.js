import assert from 'node:assert/strict';
import {describe, it } from 'node:test';

import Ennemy from '../model/Ennemy.js';

//test pour verifier la création d'ennemies
describe('Create Ennemy',() =>{
    it('shoud create new ennemy',() =>{
        const e= new Ennemy(1,'straight','basic');
        //verifie que e est bien crée
        assert.notEqual(e,undefined);
        assert.notEqual(e,null);
        //compare pour vérifier que les valeurs sont biens celles données
        assert.equal(e.speed,1);
        assert.equal(e.ennemy_name,'basic');
        assert.equal(e.pattern,'straight');
    }
    )}
)

