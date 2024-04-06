## JSaÉ - JSTEAM

Jeu-vidéo multijoueur écrit en Javascript (avec NodeJS et Socket.io).

## SOMMAIRE

# Table of Contents
1. [Websocket](#websockets)
2. [Difficulté rencontré lors de la SAE](#difficulté-rencontrées)
3. [Améliorations possible](#amélioration-possible)
4. [Ce dont nous sommes fière dans le projet](#ce-dont-nous-sommes-le-plus-fière)

##  WEBSOCKETS

### Création d'une partie

![Création rendu png](./rendu/img/Création%20partie%20fix.png)

### Connexion a une partie

![Connexion rendu png](./rendu/img/Connexion%20Partie.png)

### Lancement de la partie 

![Lancement rendu png](./rendu/img/Lancement%20Partie.png)

### Le joueur a fait une Action

![Action rendu png](./rendu/img/Action%20joueur.png)

### Un joueur se déconnecte de la partie 

![Déco partie rendu png](./rendu/img/déco%20partie%20fix.png)

### Un joueur se déconnecte du salon

![Déco salon rendu png](./rendu/img/deco%20fix.png)

## DIFFICULTÉ RENCONTRÉES 

### Gestion du temps

La gestion du temps a été un problème car l'on a cru manquer de temps sur la fin avec toute la partie de débug 

### Trouver l'origine de certains bug

Certains bugs on été très durs a corriger ,car beaucoups de choses influaient dessus 

## AMÉLIORATION POSSIBLE

### portage mobile 

### ajouts de différents fonds et différents rendus pour les ennemis 

nous avons choisi de tout faire en pixel art par nos soins sans utiliser d' IA pour créer les rendus ,mais cela a réduit le nombre de variations possible , néanmoins ,nous préférons cela et avoirs des graphismes plus beaux et moins de variété a l'écrans.

## CE DONT NOUS SOMMES LE PLUS FIÈRE

### toutes les choses affichées ont étés faites par nos soins 

des Avatars des ennemis ,au fond d'écrans ,au balles ,tout a été fait par notre groupe (et principalement raphael ) en pixel art afin d'avoir le rendu le plus authentique possible

### utilisation de vecteur pour les pattern de déplacements (des personange ,des ennemis ou des projectiles)

Nous avons décider d'utiliser des vecteurs pour tout les éléments animées car cela permet plus de liberté sur le déplacement et la vitesse 

### utilisation de factories

l'utilisation de Factories nous a permis de pouvoir générer des ennemis de manière plus simple et plus légère ,sans avoir a renier sur la diversité des ennemis 

### architecture MVC

l'utilisation de l'architecture MVC nous a permis de rendre le code plus facilement maintenable et testable afin de pouvoir changer 