class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu")
        this.theme = "bg_daylight"
    }

    create() {
        gameState.background = this.add.image(0, 0, this.theme).setOrigin(0, 0);
        var title = this.add.image((config.width * 0.5), (config.height * 0.2), "img_title").setOrigin(0.5).setScale(0.4).setDepth(1)
        var house = this.add.image(config.width * 0.05, config.height - 50, "img_house").setOrigin(0, 1).setScale(0.7)
        gameState.tree = this.add.image(config.width * 0.70, config.height - 42, "ter_tree_pine1").setOrigin(0, 1).setScale(2)
        var ground = this.add.image(0, config.height - 50, "ter_grass_800x50").setOrigin(0.0)
        var womanIdle = this.add.image(config.width * 0.30, config.height - 50, "img_woman_idle").setOrigin(0, 1).setScale(1.3)
        var manIdle = this.add.image(config.width * 0.25, config.height - 50, "img_man_idle").setOrigin(0, 1).setScale(1.5)


        this.time.addEvent({
            delay: 3000,
            callback: this.createClouds,
            callbackScope: this,
            repeat: -1
        });

        this.time.addEvent({
            delay: 1,
            callback: this.createClouds,
            callbackScope: this,
            repeat: 0
        });


        var playGameButton = this.add.image((config.width * 0.5), (config.height * 0.55), "img_playGame_button").setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.stop("MainMenu")
                this.scene.start("IntroScene")
                this.anims.resumeAll();
            })

        var controlsButton = this.add.image((config.width * 0.5), (config.height * 0.65), "img_control_button").setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.stop("MainMenu")
                this.scene.start("ControlsScene")
                this.anims.pauseAll();
            })

        var quitGameButton = this.add.image((config.width * 0.5), (config.height * 0.75), "img_quitGame_button").setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.stop("MainMenu")
                this.scene.start("QuitGameScene")
                this.anims.resumeAll();
            })
    }

    createClouds() {
        var scaleFactor = Phaser.Math.Between(0, 2)
        var y = Phaser.Math.Between(50, 150)
        var cloud = this.add.image(-200, y, "ter_cloud").setOrigin(0.0).setScale(scaleFactor)
        var speed = Phaser.Math.Between(8000, 15000)
        this.cloud1Tween = this.tweens.add({
            targets: cloud,
            x: 1000,
            ease: 'Linear',
            duration: speed,
            repeat: 0,
            yoyo: false
        })
    }
}