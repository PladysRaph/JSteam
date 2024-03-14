export default class{
    ennemy_name;//nom de l'ennemis (facultatif)
    speed;//vitesse de déplacement de l'ennemi
    pattern;//pattern de déplacement

    constructor(speed,pattern,name){
        this.ennemy_name=name;
        this.speed=speed;
        this.pattern=pattern;
    }


}