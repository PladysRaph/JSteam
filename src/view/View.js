export default class View {
    // Conteneur principal dans lequel injecter la vue (SPA - Single Page Application)
    static mainContent = document.querySelector("#main");

    constructor(html, controller = null) {
        this.content = html;
        // Remplacer le contenu de main par le code html en paramètre
        View.mainContent.innerHTML = this.content;
        this.controller = controller;
    }
}