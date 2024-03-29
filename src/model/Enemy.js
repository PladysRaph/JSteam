import Avatar from './Avatar.js';
import Bullet from './Bullet.js';
import Entity from './Entity.js'
import PatternFactory from './PatternFactory.js';
import Track from './Track.js';

export default class Enemy extends Entity {
    constructor(name, x, y, speed, avatar, pattern = null, bullet = null) {
        super(name, x, y, speed, avatar);
        // PVs du joueur
        this.hp = 30;
        // Pattern de déplacement
        if (pattern == null || !Array.isArray(pattern))
            this.pattern = PatternFactory.defaultPattern();
        else
            this.pattern = pattern;
        this.pathTravelled = 0;
        // Balle utilisée
        if (bullet == null)
            this.bullet = new Bullet(
                'Red pearl bullet', x, y, 10,
                new Avatar('public/assets/img/red-pearl-bullet.png', 16, 16),
                null, 1, 50);
        else
            this.bullet = bullet;
    }

    // Effectue le pattern comme si l'Enemy avait bougé pendant les frames, permet de tester le déplacement
    skipFrame(frame) {
        for (let index = 0; index < frame; index++) {
            this.move();
        }
    }

    //Déplace l'Enemy sur son Pattern dépendemment de sa vitesse
    move() {
        // On effectue speed fois l'opération
        for (let index = 0; index < this.speed; index++) {
            // On définit les limites de temps pour déterminer dans quel vecteur on se situe
            let currentPathMin = 0;
            let currentPathMax = 0;
            // Pour chaque track dans le pattern, on vérifie si c'est bien à son tour d'être utilisé
            for (let index = 0; index < this.pattern.length; index++) {
                // La limite maximum correspond à l'addition des frames des vecteurs y compris le courant
                currentPathMax += this.pattern[index].frame;
                // Si c'est le bon vecteur, on se déplace
                if (this.pathTravelled >= currentPathMin && this.pathTravelled < currentPathMax) {
                    this.x += this.pattern[index].x;
                    this.y += this.pattern[index].y;
                } 
                // La limite minimum correspond à l'addition des frames des vecteurs sans le courant durant la vérification
                currentPathMin += this.pattern[index].frame;
            }
            // On indique qu'on s'est déplacé
            this.pathTravelled++;
            // Si on a parcouru tout le pattern, on revient au début
            if (this.pathTravelled == currentPathMax) 
                this.pathTravelled = 0;
        }
        // En conséquence, on change le point de départ des balles
        this.bullet.x = this.x;
        this.bullet.y = this.y;
    }
}