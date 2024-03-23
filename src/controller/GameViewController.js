import Controller from "./Controller.js";

export default class GameViewController extends Controller {

    constructor(model) {
        super(model);
    }

    // Redimensionner le canvas (responsive-design)
    resizeCanvas(canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    // Générer l'avatar en HTML
    generateHTMLAvatar() {
        let image = new Image(this.currentModel.avatar.width, this.currentModel.avatar.height);
        image.src = this.currentModel.avatar.url;
        return image;
    }

    // Dessiner une image
    drawImage(canvas, img) {
        canvas.drawImage(
            img,
            this.currentModel.x,
            this.currentModel.y,
            img.width,
            img.height);
    }

    // Gestion des collisions
    handleCollisions(canvas) {
        // Vérifier que le joueur ne dépasse pas le cadre vers la droite / bas
        if (this.currentModel.x > canvas.width - this.currentModel.avatar.width)
            this.currentModel.x = canvas.width - this.currentModel.avatar.width;

        if (this.currentModel.y > canvas.height - this.currentModel.avatar.height)
            this.currentModel.y = canvas.height - this.currentModel.avatar.height;
        
        // Vérifier que le  joueur ne dépasse pas le cadre vers la gauche / haut
        if (this.currentModel.x < 0) this.currentModel.x = 0;
        if (this.currentModel.y < 0) this.currentModel.y = 0;
    }

    // Déplacer le joueur en changeant ses coordonnées
    move(canvas) {
        this.currentModel.x += this.currentModel.xFactor;
        this.currentModel.y += this.currentModel.yFactor;
        this.handleCollisions(canvas);
    }

    // Appuyer sur une touche pour se déplacer
    keydown(keyCode) {
        switch (keyCode) {
            case 'KeyD':
                this.currentModel.xFactor = this.currentModel.speed;
                break;
            case 'KeyA':
                this.currentModel.xFactor = -this.currentModel.speed;
                break;
            case 'KeyW':
                this.currentModel.yFactor = -this.currentModel.speed;
                break;
            case 'KeyS':
                this.currentModel.yFactor = this.currentModel.speed;
                break;
            default:
                break;
        }
    }

    // Relâche une touche arrêter le déplacement
    keyup(keyCode) {
        switch (keyCode) {
            case 'ArrowRight':
                this.currentModel.xFactor = 0;
                break;
            case 'ArrowLeft':
                this.currentModel.xFactor = 0;
                break;
            case 'ArrowUp':
                this.currentModel.yFactor = 0;
                break;
            case 'ArrowDown':
                this.currentModel.yFactor = 0
                break;
            default:
                break;
        }
    }

    
}