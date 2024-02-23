export default class View {
    constructor(view, controller) {
        // Conteneur principal dans lequel injecter la vue (SPA - Single Page Application)
        this.mainContent = document.querySelector("#main");
        // Remplacer le contenu de main par le code html en paramètre
        this.mainContent.innerHTML = view;
        this.controller = controller;
    }
}