class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene")
    }

    create() {
        this.add.text(config.width / 2, 290, "YOU LOSE!", {
            fontSize: "32px",
            fill: "#000",
        }).setOrigin(0.5);
        this.add.text(config.width / 2, 200, "Score: " + gameState.score, {
            fontSize: "32px",
            fill: "#000",
        }).setOrigin(0.5);
        const playAgainButton = this.add.text(config.width / 2, 390,
            "Click here to play again", {
            fontSize: "16px",
            fill: "#000",
        }).setOrigin(0.5).setInteractive()
            .on("pointerdown", () => {
                this.scene.stop("EndScene")
                this.scene.start("MainMenu")
                this.anims.resumeAll();
            })

    }
}