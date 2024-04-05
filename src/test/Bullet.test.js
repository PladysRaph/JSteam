import assert from 'node:assert/strict';
import {describe, it } from 'node:test';

import Bullet from '../model/Bullet.js';
import Avatar from '../model/Avatar.js'
import Track from '../model/Track.js'

describe('Create Bullet',() => {
        it('should create new bullet', () =>{
            const bullet = new Bullet(
                'Bullet 1', 0, 0, 10,
                new Avatar('public/assets/img/red-pearl-bullet.png', 32, 32), 1, 500);

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

            // Vérifie que les arrays ont été initialisé et sont vide
            assert.equal(bullet.arrX.length,0); 
            assert.equal(bullet.arrY.length,0);
        }
    )}
)

describe('Displace Bullet',() => {
    it('should displace a bullet', () =>{
        const bullet = new Bullet(
            'Bullet 1', 200, 0, 1,
            new Avatar('public/assets/img/red-pearl-bullet.png', 32, 32), 1, 10,50);

        // Vérifie la position de base du bullet
        assert.equal(bullet.x, 200);
        assert.equal(bullet.y, 0);

        // Vérifie les autre variable du bullet

        assert.equal(bullet.damage,10);
        assert.equal(bullet.cooldown,50);

        // Déplace le bullet comme s'il avait bougé pendant 100 frames puis vérifie que le déplacement a bien été effectué
        bullet.skipFrame(100);
        assert.equal(bullet.arrX.length,2);
        assert.equal(bullet.arrY.length,2);
        assert.equal(bullet.arrX[0], 100);
        assert.equal(bullet.arrY[0], 0);
        assert.equal(bullet.arrX[1], 150);
        assert.equal(bullet.arrY[1], 0);

    }
)}
)

describe('Delete Bullet',() => {
    it('should delete a bullet form array',() => {
        const bulletTest = new Bullet(
            'Bullet 1', 200, 0, 1,
            new Avatar('public/assets/img/red-pearl-bullet.png', 32, 32), 1, 10,50);
        
        // Vérifie que bullet est bien créé
        assert.notEqual(bulletTest, undefined);
        assert.notEqual(bulletTest, null);

        
        //passer le temps pour ajouter des bullets
        bulletTest.skipFrame(100);
        assert.equal(bulletTest.arrX.length,2);
        assert.equal(bulletTest.arrY.length,2);

        // Tue la bullet 
        bulletTest.delete(0);
        
        //Vérifie que la bullet a été détruite et que la bullet à l'index 0 a bien été remplacé par celle a l'index 1
        assert.equal(bulletTest.arrX.length,1);
        assert.equal(bulletTest.arrY.length,1);
        assert.equal(bulletTest.arrX[0], 150);
        assert.equal(bulletTest.arrY[0], 0);
    } )

}
)

