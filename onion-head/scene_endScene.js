class EndScene extends Phaser.Scene {
    constructor() {
        super("EndScene")
    }

    create() {
        gameState.background = this.add.image(0, 0, "bg_daylight").setOrigin(0, 0);
        var house = this.add.image(config.width * 0.05, config.height - 50, "img_house").setOrigin(0, 1).setScale(0.7);
        gameState.grass = this.physics.add.image(config.width * 0.5, config.height - 25, "ter_grass_800x50").setOrigin(0.5, 0.5).setDepth(2);
        gameState.grass.body.immovable = true;
        gameState.grass.body.allowGravity = false;
        gameState.introTree = this.add.image(config.width * 0.70, config.height - 42, "ter_tree_pine1").setOrigin(0, 1).setScale(2).setDepth(1);

        gameState.womanIdle = this.add.image(config.width * 0.33, config.height - 78, "img_woman_idle").setOrigin(0.5, 0.5).setScale(1.3)
        gameState.manIdle = this.add.image(config.width * 0.28, config.height - 83, "img_man_idle").setOrigin(0.5, 0.5).setScale(1.5)

        
        this.add.text(config.width / 2, 200, "Score: " + gameState.score, {
            fontSize: "32px",
            fill: "#000",
        }).setOrigin(0.5);

        this.add.text(config.width / 2, 150, "You've won!", {
            fontSize: "32px",
            fill: "#000",
        }).setOrigin(0.5);
        
        var playAgainButton = this.add.text(config.width/2, 300,
            "Click here to play again", {
            fontSize: "16px",
            fill: "#000",
        }).setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
            this.scene.stop("EndScene")
            this.scene.start("MainMenu")
            this.anims.resumeAll();
        })
    }
}
