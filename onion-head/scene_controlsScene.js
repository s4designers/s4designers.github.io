class ControlsScene extends Phaser.Scene {
    constructor(){
        super("ControlsScene")
    }

    create() {
        var controlsImage = this.add.image((config.width * 0.5), (config.height - 50), "img_controls").setOrigin(0.5 ,1).setScale(0.1);
        var backButton = this.add.image((config.width * 0.02), (config.height * 0.05), "img_backButton").setOrigin(0,0).setScale(0.08)
        .setInteractive()
        .on("pointerdown", () => {
            this.scene.stop ("ControlsScene")
            this.scene.start("MainMenu")
            this.anims.resumeAll();
        })
    }
}