export default class Entity {
    constructor(name, x, y, speed, avatar) {
        // Nom de l'entité
        this.name=name;
        // Coordonnées de l'entité
        this.x = x;
        this.y = y;
        // Vitesse
        this.speed = speed;
        // Avatar du joueur
        this.avatar = avatar;
    }
}