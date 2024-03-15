export default class Player {
    constructor(name, avatar) {
        // Nom du joueur
        this.name = name;
        // Avatar du joueur
        this.avatar = avatar;
        // Coordonnées du joueur
        this.x = 0;
        this.y = 0;
        // Facteurs de vitesse
        this.xFactor = 0;
        this.yFactor = 0;
        // Vitesse de base
        this.speed = 1;
    }
}
