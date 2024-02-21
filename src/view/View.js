export default class View {
    static canvas = document.querySelector('.gameCanvas');
    static context2D = this.canvas.getContext('2d');

    constructor() {
        // Responsive view (canvas)
        const canvasResizeObserver = new ResizeObserver(() => {
            View.canvas.width = View.canvas.clientWidth;
            View.canvas.height = View.canvas.clientHeight;
        });
        canvasResizeObserver.observe(View.canvas);
    }
}