import View from "./View.js";

export default class CreditsView extends View {
    #MenuBtn
    #BestGames

    constructor(controller) {
        super(`<section id="credits">        
        <a href="index.html" id="indexButton">Revenir a l'écran de Conenxion</a>
        <div id="crawling">
        <div id="members">
                <h2>Groupe G</h2>
                <div id='Nitor'>
                    <h1>Florian DELBE</h1>
                    <h2>Nitor</h2>
                    <h3 id="BestGame"><a target="_blank" href="https://store.steampowered.com/app/1687950/Persona_5_Royal/">Persona 5 royal</a></h3>
                    
                </div>
                <div id='Neyako'>
                    <h1>Raphaël PLADYS</h1>
                    <h2>Neyako</h2>
                    <h3 id="BestGame"><a target="_blank" href="https://www.nintendo.fr/Jeux/Wii/Super-Mario-Galaxy-2-529982.html">Super Mario Galaxy 2</a></h3>
                </div>
        <div id='Mortim'>
            <h1>Karim AOULAD TAYAB</h1>
            <h2>Mortim</h2>
            <h3 id="BestGame"><a target="_blank" href="https://store.steampowered.com/app/240/CounterStrike_Source/">Counter Strike -: Source</a></h3>

        </div>
    </div>
    </div>
    </section>`, controller);

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