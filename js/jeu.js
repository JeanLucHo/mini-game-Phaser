//Importation des scripts et classes nécessaires
import { SceneChargement } from "./scenes/SceneChargement.js";
import { SceneIntro } from "./scenes/SceneIntro.js";
import { SceneJeu } from "./scenes/SceneJeu.js";
import { SceneFinJeu } from "./scenes/SceneFinJeu.js";

//On crééra le jeu quand la page HTML sera chargée
window.addEventListener(
  "load",
  function () {
    //On définit avec des variables les dimensions du jeu sur desktop
    let largeur = 576,
      hauteur = 1024;

    //On fait 2 vérifications la première pour "Mobile" et la seconde pour "Tablet"
    //Et si on est sur un mobile (tablette ou téléphone), on re-dimensionne le jeu
    if (
      navigator.userAgent.includes("Mobile") ||
      navigator.userAgent.includes("Tablet")
    ) {
      //console.log("Le jeu est lu sur un mobile... on change les dimensions...");
      largeur = Math.min(window.innerWidth, window.innerHeight);
      hauteur = Math.max(window.innerWidth, window.innerHeight);
    }

    // Object pour la configuration du jeu - qui sera passé en paramètre au constructeur
    let config = {
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: largeur,
        height: hauteur,
      },
      backgroundColor: "#F4F4F4",
      scene: [SceneChargement, SceneIntro, SceneJeu, SceneFinJeu],
      input: {
        activePointers: 1,
      },
    };

    // Création du jeu comme tel - comme objet global pour qu'il soit accessible à toutes les scènes du jeu
    window.game = new Phaser.Game(config);

    //Un fois que l'objet "Game" est créé, on y ajoute une propriété,
    //sous forme d'objet, pour identifier et configurer les grandes caractéristiques du jeu en cours
    window.game.jeu = {
      scoreJoueurMiniShooter: 0, //Score du joueur pour une joute
      meilleureScoreMiniShooter: 0,
      vieJoueurMiniShooter: 3,
      tempsResMiniShooter: 0,
      tempsTargetMiniShooter: 0,
      NOM_LOCAL_STORAGEMiniShooter: "statistiquesRPC", //Sauvegarde et enregistrement des statistiques du jeu
    };
  },
  false
);
