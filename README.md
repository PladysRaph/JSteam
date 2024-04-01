## JSaÉ - JSTEAM

Jeu-vidéo multijoueur écrit en Javascript (avec NodeJS et Socket.io).

## Regles

### augmentations des points

valeur d'un ennemi X numéro de vague \
valeur d'un ennemi X temps passé dans le jeu \
numéro de vague X temps passé dans le jeu

### Apparition des bonus

a la mort d'un ennemi (ave un % random) \
full random du ciel \
après une certaine durée(apres le premier)

## Ennemis

                vitesse     mouvement
 basiques:      3           ligne droite
 sinking:       2           zig-zag (change de sens quand il touche un bord de l'écran)
 telekinesiste  2           ligne droite invisible

 | name          | speed    | Attack speed | hp  | degats                   | patter de deplacement                                             | specialité                              |
|---------------|----------|--------------|-----|--------------------------|-------------------------------------------------------------------|-----------------------------------------|
| speedster     | 90       | 0            | 15  | 5(au contact)            | ligne droite                                                      |                                         |
| soho          | 10       | 0.5          | 20  | 10                       | zigzag                                                            |                                         |
| uther         | 5        | 0.1          | 75  | 10(au contact)           | stand-by                                                          |                                         |
| kayn          | 50       | 0.1          | 25  | 25(au contact)           | zig zag                                                           |                                         |
| belveth       | 20       | 5.0          | 20  | 1                        | ligne droite ou stand by( a definir)                              |                                         |
| tsuyu         | 25       | 1.0          | 30  | 3                        | rebond (en cloche toutjour la même hauteur)                       |                                         |
| yoru          | 25       | 2.0          | 15  | 5                        | ligne droite                                                      | en partie invisible                     |
| ziggs         | 15       | 0.5          | 15  | 10                       | ligne droite ou stand by                                          | tir en cloche qui sortent de l'écran    |
| zane          | 20       | 1            | 10  | 5                        | en cercle                                                         |                                         |
| genji         | 25       | 0.5          | 15  | 2                        | stand by                                                          | renvoie la première balle qui le touche |
| collei        | 15       | 1            | 20  | 5                        | en forme de larme                                                 |                                         |
| space invader | 10       | 0            | 50  | 15(au contact)           | (zigzac carré)                                                    |                                         |
| koopa         | 5->30->5 | 0.5          | 30  | 2(au contact devient 10) | ligne droite avec arret(_._._._._._._ les points sont les arrets) | change de vitesse quand il s'arrete     |
| flaco         | 25       | 0.2          | 15  | 5                        | zig-zac sur tout l'écran                                          |                                         |
| pong          | 10       | 0.1          | 50  | 1                        | verticale totale                                                  |                                         |
## Bonus

a détermiser apres reunion de crise (marquer vous idées de bonus en dessous)

### approved

### en reflexion

degats augmentés \
frezze les ennemis \
empeches les ennemis de tirer (si ils peuvent tirer) \
clear le terrain(depop tout les ennemis une fois) \
plus de balles \
tirer plus vite