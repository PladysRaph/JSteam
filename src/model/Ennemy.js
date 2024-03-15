export default class Enemy {
    //nom de l'ennemis (facultatif)
    ennemy_name;
    //vitesse de déplacement de l'ennemi
    speed;
    //pattern de déplacement
    pattern;

    constructor(speed,pattern,name){
        this.ennemy_name=name;
        this.speed=speed;
        this.pattern=pattern;
    }
}