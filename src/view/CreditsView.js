import View from "./View.js";

export default class CreditsView extends View {
    #MenuBtn
    #BestGames

    constructor(controller) {
        super(`<div id="credits">
        <a href="index.html" id="indexButton">Revenir a l'écran de Conenxion</a>
        <h2>Groupe G</h2>
        <div id='Nitor'>
            <h1>Florian DELBE</h1>
            <h2>Nitor</h2>
            <h3 id="BestGame">Persona 5 royal</h3>
            <a href="https://store.steampowered.com/app/1687950/Persona_5_Royal/">Voir le jeu</a>
        </div>
        <div id='Neyato'>
            <h1>Raphaël PLADYS</h1>
            <h2>Neyako</h2>
            <h3 id="BestGame">Super Mario Galaxy 2</h3>
            <a href="https://www.nintendo.fr/Jeux/Wii/Super-Mario-Galaxy-2-529982.html">Voir le jeu</a>
        </div>
        <div id='UndefinedPseudo'>
            <h1>Raphaël PLADYS</h1>
            <h2>Neyako</h2>
            <h3 id="BestGame">Super Mario Galaxy 2</h3>
            <a href="">Voir le jeu</a>
        </div>
    </div>`, controller);

    this.#MenuBtn=View.mainContent.querySelector("#indexButton");
    this.#BestGames=View.mainContent.querySelectorAll('#BestGame')
    this.setListener();
    }
    
    setListener(){
        this.#MenuBtn.addEventListener('click', event =>{
            event.preventDefault();
            this.controller.backToTitleScreen();
        });
        this.#BestGames.forEach(game =>{
            e.preventDefault();
            
        });
    }

}