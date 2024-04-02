import Entity from './Entity.js';
import PatternFactory from './PatternFactory.js';

export default class Bullet extends Entity {
    constructor(name, x, y, speed, avatar, pattern = null, damage, cooldown) {
        super(name, x, y, speed, avatar);
        // Patterne pour les balles
        if (pattern == null || !Array.isArray(pattern))
            this.pattern = PatternFactory.defaultPattern();
        else
            this.pattern = pattern;
        // Dégâts infligés
        this.damage = damage;
        // Frames pour qu'une balle sorte
        this.cooldown = cooldown;
        // Frames restantes avant qu'une balle sorte
        this.release = cooldown;
        // Tableaux de coordonnées des balles existantes
        this.arrX = new Array();
        this.arrY = new Array();
        // Tableau des frames restantes d'existence des balles
        this.TTLs = new Array();
        // Tableau des frames que les balles ont déjà parcourues sur leur patterne respectif
        this.pathTravelled = new Array();
    }
    
    //Déplace un des Bullets sur le Pattern dépendemment de la vitesse
    move(printingIndex) {
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
                if (this.pathTravelled[printingIndex] >= currentPathMin && this.pathTravelled[printingIndex] < currentPathMax) {
                    this.arrX[printingIndex] += this.pattern[index].x;
                    this.arrY[printingIndex] += this.pattern[index].y;
                } 
                // La limite minimum correspond à l'addition des frames des vecteurs sans le courant durant la vérification
                currentPathMin += this.pattern[index].frame;
            }
            // On indique qu'on s'est déplacé
            this.pathTravelled[printingIndex]++;
            // Si on a parcouru tout le pattern, on revient au début
            if (this.pathTravelled[printingIndex] == currentPathMax) 
                this.pathTravelled[printingIndex] = 0;
        }
        // On indique que le Bullet a vécu plus longtemps
        this.TTLs[printingIndex]--;
        // Si le Bullet a atteint sa limite de temps, il est supprimé
        if (this.TTLs[printingIndex] == 0) this.delete(printingIndex);
    }

    // Déplace tout les Bullets et les crée quand besoin
    moveAll(createNew = true) {
        // S'il est temps qu'on envoie un nouveau bullet, on ajoute les informations nécessaires et on reset le timer
        if (createNew && this.release >= this.cooldown) {
            this.pathTravelled.push(0);
            this.arrX.push(this.x);
            this.arrY.push(this.y);
            this.TTLs.push(240);
            this.release = 0;
        }
        // On déplace tout les Bullets
        for (let index = 0; index < this.arrX.length; index++)
            this.move(index);
        // On indique le déplacement
        this.release++;
    }

    // Supprime les infos d'un Bullet selon son index
    delete(printingIndex) {
        this.arrX.splice(printingIndex, 1);
        this.arrY.splice(printingIndex, 1);
        this.pathTravelled.splice(printingIndex, 1);
        this.TTLs.splice(printingIndex, 1);
    }

    // Effectue le pattern comme si l'Enemy avait bougé pendant les frames, permet de tester le déplacement
    skipFrame(frame) {
        for (let index = 0; index < frame; index++) {
            this.moveAll();
        }
    }
}