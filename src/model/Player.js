export default class Player {
    constructor() {
        // Coordonnées du joueur
        this.x = 0;
        this.y = 0;
        // Facteurs d'accélération
        this.xFactor = 0;
        this.yFactor = 0;
        this.speed = 1;
        // Avatar du joueur
        this.avatar = new Image(); this.avatar.src = '/assets/img/New Piskel.png'
    }
}
