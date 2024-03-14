import assert from 'node:assert/strict';
import {describe, it } from 'node:test';

import Ennemy from '../model/Ennemy.js';

describe('Create Ennemy',() =>{
    it('shoud create new ennemy',() =>{
        const e= new Ennemy('basic',1,'straight');
        console.log("e crée");
        assert.notEqual(e,undefined);
        assert.notEqual(e,null);
        assert.equal(e.speed,1);
        assert.equal(e.ennemy_name,'basic');
        assert.equal(e.pattern,'straight');
    }
    )}
)