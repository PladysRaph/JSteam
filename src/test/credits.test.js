import assert from 'node:assert/strict';
import CreditsView from '../view/CreditsView';
import { describe, it } from 'node:test';

//test qui verifie que les credits s'affichent bien( verifie que la div qui a comme id credits est bien ajouté dans la page html)
describe('switchToCredits',() =>{
    it('shoud set credit as active',()=>{
        new CreditsView();
        assert.strictEqual(document.querySelector("#credits").getAttribute("id"),"credits")});
});
