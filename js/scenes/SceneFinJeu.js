//Importation des fichiers classes ou fichiers nécessaires
import { GrilleMontage } from "../utils/GrilleMontage.js";
/**
 * Class representant la scène du jeu comme tel
 */

export class SceneFinJeu extends Phaser.Scene {
  constructor(config) {
    //Appeler le constructeur de la super-classe
    super("SceneFinJeu");
  }

  create() {
    console.log("FinJeu");

    // Ajouter image titre
    let imgbackground = this.add.image(
      game.config.width,
      game.config.height,
      "backgroundImage"
    );
    GrilleMontage.mettreEchelleRatioX(imgbackground);
    imgbackground.setOrigin(1, 1);
    this.afficherTitre();
  }

  // ===========================================================================
  /**
   * Afficher le titre
   */
  afficherTitre() {
    // Ajouter image titre
    let imgFinJeu = this.add.image(
      game.config.width / 2,
      game.config.height,
      "finJeu"
    );
    GrilleMontage.mettreEchelleRatioX(imgFinJeu);
    imgFinJeu.setOrigin(0.5, 0.5);

    //Animation du texte d'intro
    this.tweens.add({
      targets: imgFinJeu,
      y: game.config.width / 2.5,
      ease: "Bounce.easeOut",
      callbackScope: this,
      onComplete: this.afficherScores,
    });
  }

  // ===========================================================================
  /**
   * Afficher les textes et inciter le jouer à rejouer
   */
  afficherScores() {
    let tailleTexte = Math.round(64 * GrilleMontage.ajusterRatioX());

    //Vérification et enregistrement du meilleur score
    console.log(
      game.jeu.scoreJoueurMiniShooter,
      game.jeu.meilleureScoreMiniShooter
    );
    game.jeu.meilleureScoreMiniShooter = Math.max(
      game.jeu.scoreJoueurMiniShooter,
      game.jeu.meilleureScoreMiniShooter
    );
    localStorage.setItem(
      game.jeu.NOM_LOCAL_STORAGEMiniShooter,
      game.jeu.meilleureScoreMiniShooter
    );

    //Texte
    tailleTexte = Math.round(36 * GrilleMontage.ajusterRatioX());
    let leTexte = "   Votre score:\n";
    leTexte += game.jeu.scoreJoueurMiniShooter + " target touché(s)\n\n";
    leTexte += "  Meilleur score:\n";
    leTexte += game.jeu.meilleureScoreMiniShooter + " target touché(s)";

    let finJeuTxt = this.add.bitmapText(
      game.config.width / 2,
      game.config.height / 2,
      "Fonts",
      leTexte,
      40
    );
    finJeuTxt.setOrigin(0.5);

    this.afficherBouton();
  }

  // ===========================================================================
  /**
   * Afficher le bouton et faire jouer son animation
   */
  afficherBouton() {
    //Le bouton
    let leBouton = this.add.image(
      game.config.width / 2,
      game.config.height,
      "rejouerBtn",
      0
    );
    leBouton.setOrigin(0.5, 2);
    GrilleMontage.mettreEchelleRatioX(leBouton);

    //Interactivité du bouton
    leBouton.setInteractive();

    //Gestionnaires d'événement
    leBouton.once("pointerdown", this.rejouer, this);

    leBouton.on("pointerover", function () {
      this.setFrame(1);
    });

    leBouton.on("pointerout", function () {
      this.setFrame(0);
    });
  }

  // ===========================================================================
  /**
   * Retour à la scène Jeu
   */
  rejouer() {
    this.scene.start("SceneJeu");
  }
}
