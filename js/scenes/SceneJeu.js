//Importation des fichiers classes ou fichiers nécessaires
import { GrilleMontage } from "../utils/GrilleMontage.js";
/**
 * Class representant la scène du jeu comme tel
 */

export class SceneJeu extends Phaser.Scene {
  constructor(config) {
    //Appeler le constructeur de la super-classe
    super("SceneJeu");

    //Propriétés de la scène du jeu
    this.score;
    this.vie;
    this.temps;
    this.tableauElements = []; //Tableau pour enregistrer les éléments du jeu: cible
    this.groupTarget;
    this.boutonPleinEcran;

    //Vérification d'un meilleur score antérieur enregistré
    game.jeu.meilleurScore =
      localStorage.getItem(game.jeu.NOM_LOCAL_STORAGEMiniShooter) === null
        ? 0
        : localStorage.getItem(game.jeu.NOM_LOCAL_STORAGEMiniShooter);
  }

  init() {
    //Initialiser le score
    game.jeu.scoreJoueurMiniShooter = 0;
    game.jeu.vieJoueurMiniShooter = 5;
    game.jeu.tempsTargetMiniShooter = 0;
    game.jeu.tempsResMiniShooter = 50;

    //Initialiser le tableau des éléments du jeu
    this.tableauElements = [];
  }

  create() {
    // Mettre la music du background
    this.mettreBackground();
    //La minuterie pour creer des cercles chaque 1.2 secondes
    this.minuterieCercle();
    this.minuterieTemps();
    //Mettre les cercles dans le jeu
    this.mettreCercle();
    //Mettre le texte du score
    this.afficherTexteScore();
    //Interaction sur les cercles
    this.input.on("gameobjectdown", this.cliquerCercle, this);

    // =========================================================================
    //SI on est pas sur un périphériphe iOS  et  SI le "fullscreen" est supporté par le navigateur...
    //on va instancier le bouton gérer le mode plein écran...
    //Ainsi que l'attribution du gestionnaire d'événement
    let grille = new GrilleMontage(this, 3, 7);
    if (!this.sys.game.device.os.iOS) {
      if (this.sys.game.device.fullscreen.available) {
        //On peut gérer le mode FullScreen alors on affiche le bouton
        this.boutonPleinEcran = this.add.image(0, 0, "pleinEcran", 0);
        this.boutonPleinEcran.name = "BtnPleinEcran";
        grille.placerIndexCellule(2.2, this.boutonPleinEcran);
        GrilleMontage.mettreEchelleRatioMin(this.boutonPleinEcran);
        this.boutonPleinEcran.setInteractive({
          useHandCursor: true,
        });
        this.boutonPleinEcran.depth = 50;
        //Gestionnaire d'événement sur le bouton
        this.boutonPleinEcran.on("pointerup", this.changerEcran, this);
      }
    }

    // =========================================================================
    // Musique d'ambiance
    if (!this.musique || !this.musique.isPlaying) {
      this.musique = this.sound.add("sonBackground", {
        volume: 0.2,
        loop: true,
      });
      this.musique.play();
    }

    // =========================================================================
    // Gérer changement d'orientation si sur mobile
    if (!this.sys.game.device.os.desktop) {
      this.verifierOrientationJeu();
      this.scale.on("resize", this.verifierOrientationJeu, this);
    }
  }

  // ===========================================================================
  /**
   * Gestion du plein écran
   */
  changerEcran() {
    if (!this.scale.isFullscreen) {
      this.scale.startFullscreen();
      this.boutonPleinEcran.setFrame(1);
    } else {
      this.scale.stopFullscreen();
      this.boutonPleinEcran.setFrame(0);
    }
  }

  // ===========================================================================
  /**
   * Gestion de l'orientation de l'écran
   */
  verifierOrientationJeu() {
    if (window.orientation != 0) {
      this.scene.pause(this);
      document.getElementById("changerOrientation").style.display = "block";
    } else {
      this.scene.resume(this);
      document.getElementById("changerOrientation").style.display = "none";
    }
  }

  // ===========================================================================
  /**
   * Function pour afficher le texte score
   */

  afficherTexteScore() {
    this.grille = new GrilleMontage(this, 4, 7, 0x00ff00);

    // Texte pour le score
    this.score = this.add.bitmapText(
      game.config.width / 2,
      0,
      "Fonts",
      "Votre Score:" + game.jeu.scoreJoueurMiniShooter,
      60
    );
    this.score.setOrigin(0.5, -1.2);

    // Texte pour le vie joueur
    this.vie = this.add.bitmapText(
      game.config.width / 2,
      game.config.height,
      "Fonts",
      "Vie(s) restante(s):" + game.jeu.vieJoueurMiniShooter,
      60
    );
    this.vie.setOrigin(0.5, 1.5);

    // Texte pour le temps joueur
    this.temps = this.add.bitmapText(
      game.config.width / 2,
      0,
      "Fonts",
      "Temps: " + game.jeu.tempsResMiniShooter,
      60
    );
    this.temps.setOrigin(0.5, -0.3);
    this.score.setDepth(3);
    this.vie.setDepth(3);
    this.temps.setDepth(3);
  }

  // ===========================================================================
  /**
   * La minuterie pour creer des cercles chaque 1.2 secondes
   */

  minuterieCercle() {
    this.minuterie = this.time.addEvent({
      delay: 1200,
      callback: this.mettreCercle,
      callbackScope: this,
      loop: true,
    });
  }

  // ===========================================================================
  /**
   * La minuterie pour diminuer le temps chaque 1 seconde
   */

  minuterieTemps() {
    this.minuterie = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.diminuerTemps,
      callbackScope: this,
    });
  }

  // ===========================================================================
  /**
   * Placer les cercles dans le jeu
   */

  mettreCercle(uneCible) {
    this.groupTarget = this.add.group();
    uneCible = this.groupTarget.create(0, 0, "target");
    uneCible.x = Phaser.Math.RND.realInRange(0, game.config.width);
    uneCible.y = Phaser.Math.RND.realInRange(0, game.config.height);
    uneCible.setInteractive();
    //Mettre le curseur en pointeur
    uneCible.input.cursor = "pointer";
    // Ajouter l'élément dans le tableau des éléments du jeu
    this.tableauElements.push(uneCible);
    let index = this.tableauElements.indexOf(uneCible);
    // Si l'élément précedant n'est pas cliqué. Il va détruire
    if (index > 0) {
      this.tableauElements[index - 1].destroy();
    }
    uneCible.setDepth(10);
  }

  // ===========================================================================
  /**
   * Détruire des cercles quand on les clique
   */
  mettreBackground(background) {
    background = this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "grid"
    );

    this.displayHeight = this.sys.game.config.height;
    this.displayWidth = this.sys.game.config.width;
    this.scaleX = this.scaleY;
    background.name = "background";
    background.setInteractive();
    background.on("pointerdown", this.cliquerBackground, this);
    background.setDepth(-1);
  }

  // ===========================================================================
  /**
   * Cliquer sur des cercles
   */

  cliquerCercle(pointer, cibleCliquer) {
    if (cibleCliquer.name === "background") return;
    if (cibleCliquer.name === "BtnPleinEcran") {
      this.changerEcran();
      return;
    }
    this.input.stopPropagation();
    let tweenCercle = this.tweens.add({
      targets: cibleCliquer,
      alpha: {
        from: 1,
        to: 1,
      },
      ease: "Bounce.easeOut",
      duration: 100,
      repeat: 0,
      yoyo: false,
      onComplete: this.enleverCercle,
      onCompleteScope: this,
    });
  }

  // ===========================================================================
  /**
   * Cliquer sur le background
   */

  cliquerBackground() {
    console.log("cliquer sur le background");
    if (game.jeu.vieJoueurMiniShooter > 0) {
      game.jeu.vieJoueurMiniShooter--;
      this.vie.text = "Vie(s) restante(s):" + game.jeu.vieJoueurMiniShooter;
      this.sound.add("sonWrong").play();
    }

    if (game.jeu.vieJoueurMiniShooter === 0) {
      this.scene.start("SceneFinJeu");
    }
  }

  // ===========================================================================
  /**
   * Détruire des cercles quand on les clique
   */

  enleverCercle(objetTween) {
    // Retirer le bloc de l'affichage
    objetTween.targets[0].destroy();
    game.jeu.scoreJoueurMiniShooter++;
    this.score.text = "Votre score:" + game.jeu.scoreJoueurMiniShooter;
    this.sound.add("sonCorrect").play();
  }

  // ===========================================================================
  /**
   * Calcule et affiche le temps restant pour le jeu
   */
  diminuerTemps() {
    game.jeu.tempsResMiniShooter--;
    this.temps.text = "Temps: " + game.jeu.tempsResMiniShooter;

    //Si toutes les secondes sont écoulées, c'est la fin du jeu
    if (game.jeu.tempsResMiniShooter === 0) {
      //Arrêter la minuterie du jeu
      this.minuterie.destroy();

      this.scene.start("SceneFinJeu");
    }
  }
}
