export default class View {
    static canvas = document.querySelector('.gameCanvas');
    static context2D = this.canvas.getContext('2d');

    constructor() {
        // Responsive view (canvas)
        // TODO: Faire en sorte de redessiner le canvas à chaque redimensionnement
        new ResizeObserver(() => {
            View.canvas.width = View.canvas.clientWidth;
            View.canvas.height = View.canvas.clientHeight;
        }).observe(View.canvas);
    }
}