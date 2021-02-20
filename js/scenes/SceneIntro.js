//Importation des fichiers classes ou fichiers nécessaires
import { GrilleMontage } from "../utils/GrilleMontage.js";
/**
 * Class representant la scène d'intro du jeu
 * @extends Phaser.Scene
 */

export class SceneIntro extends Phaser.Scene {
  constructor(config) {
    //Appeler le constructeur de la super-classe
    super("SceneIntro");
  }

  create() {
    // Ajouter image titre
    let imgbackgroundDebut = this.add.image(
      game.config.width,
      game.config.height,
      "backgroundImage"
    );
    GrilleMontage.mettreEchelleRatioX(imgbackgroundDebut);
    imgbackgroundDebut.setOrigin(1, 1);
    this.afficherTitre();
  }

  // ===========================================================================
  /**
   * Afficher le titre
   */
  afficherTitre() {
    // Ajouter image titre
    let imgTitreDebut = this.add.image(
      game.config.width / 2,
      game.config.height,
      "debutJeu"
    );
    GrilleMontage.mettreEchelleRatioX(imgTitreDebut);
    imgTitreDebut.setOrigin(1, 1);

    //Animation du texte d'intro
    this.tweens.add({
      targets: imgTitreDebut,
      angle: 360,
      x: game.config.width / 1.15,
      y: game.config.width / 2.5,
      ease: "Quart.easeOut",
      callbackScope: this,
      onComplete: this.afficherInstructions,
    });
  }

  // ===========================================================================
  /**
   * Afficher les instructions
   */
  afficherInstructions() {
    // Formatter les textes
    let tailleTexte = Math.round(28 * GrilleMontage.ajusterRatioX());
    let largeurTexte = Math.round(450 * GrilleMontage.ajusterRatioX());
    let style = {
      font: `bold ${tailleTexte}px Arial`,
      color: "#1AFDFF",
      align: "center",
      wordWrap: { width: `${largeurTexte}`, useAdvancedWrap: true },
    };

    // Ajouter la description du jeu
    this.leStyle = this.add.text(
      game.config.width / 2,
      game.config.height / 2,
      "Le but du jeu est de cliquer sur les cibles et d'avoir le plus de points possibles dans un temps limite",
      style
    );
    this.leStyle.setOrigin(0.5);
    // this.leStyle.setFontFamily("'Cabin Sketch'");

    this.afficherBouton();
  }

  // ===========================================================================
  /**
   * Afficher le bouton pour commencer à jouer
   */
  afficherBouton() {
    //Le bouton
    let leBouton = this.add.image(
      game.config.width / 2,
      game.config.height,
      "commencerBtn",
      0
    );
    leBouton.setOrigin(0.5, 2);
    GrilleMontage.mettreEchelleRatioX(leBouton);

    //Interactivité du bouton
    leBouton.setInteractive();

    //Gestionnaires d'événement
    leBouton.once("pointerdown", this.allerEcranJeu, this);

    leBouton.on("pointerover", function () {
      this.setFrame(1);
    });

    leBouton.on("pointerout", function () {
      this.setFrame(0);
    });
  }

  // ===========================================================================
  /**
   * Démarre le jeu comme tel
   */
  allerEcranJeu() {
    //Aller à l'écran de jeu
    this.scene.start("SceneJeu");
  }
}
