/**
 * Class representant la scène du jeu qui charge les médias.
 * @extends Phaser.Scene
 */

export class SceneChargement extends Phaser.Scene {
  constructor(config) {
    //Appeler le constructeur de la super-classe
    super("SceneChargement");
  }

  preload() {
    //Charger les images du jeu
    this.load.setPath("medias/img/");

    this.load.image("target");
    this.load.image("grid");
    this.load.image("finJeu", "titre_fin.png");
    this.load.image("debutJeu", "titre_debut.png");
    this.load.image("backgroundImage", "background_image.png");

    // Bouton Commencer
    this.load.spritesheet("commencerBtn", "commencerBtn.png", {
      frameWidth: 240,
      frameHeight: 80,
    });

    // Bouton Rejouer
    this.load.spritesheet("rejouerBtn", "rejouerBtn.png", {
      frameWidth: 240,
      frameHeight: 80,
    });

    // Bouton Ecran
    this.load.spritesheet("pleinEcran", "spriteScreen.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    //Charger les sons
    this.load.setPath("medias/sons/");
    this.load.audio("sonCorrect", ["Correct.mp3", "Correct.ogg"]);
    this.load.audio("sonWrong", ["Wrong.mp3", "Wrong.ogg"]);
    this.load.audio(
      "sonBackground",
      ["background.mp3", "background.ogg"],
      true
    );

    //Charger le font
    this.load.setPath("medias/fonts/");
    this.load.bitmapFont("Fonts", "font.png", "font.fnt");
  }

  create() {
    this.scene.start("SceneIntro");
  }
}
