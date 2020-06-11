class StartLevel extends Phaser.Scene {
    constructor() {
        super("StartLevel")
        this.theme = "bg_daylight"
    }
    
    create() {
        gameState.background = this.add.image(0, 0, this.theme).setOrigin(0, 0);
        var house = this.add.image(config.width * 0.05, config.height - 50, "img_house").setOrigin(0, 1).setScale(0.7)
        gameState.grass = this.physics.add.image(config.width * 0.5, config.height - 25, "ter_grass_800x50").setOrigin(0.5, 0.5).setDepth(2)
        gameState.grass.body.immovable = true
        gameState.grass.body.allowGravity = false
        gameState.deadTree = this.add.image(config.width * 0.70, config.height - 23, "ter_tree_dead").setOrigin(0, 1).setScale(2.5).setDepth(1)
        gameState.introPlayer = this.add.sprite(config.width * 0.28, config.height - 83, "obj_player_man").setOrigin(0.5, 0.5).setScale(1.5)
        gameState.introPlayer.flipX = true


        this.time.addEvent({
            delay: 1,
            callback: this.createClouds,
            callbackScope: this,
            repeat: 0
        });
        
        this.time.addEvent({
            delay: 2000,
            callback: this.showText4,
            callbackScope: this,
            repeat: 0
        });

        this.time.addEvent({
            delay: 4000,
            callback: this.movePlayerRight,
            callbackScope: this,
            repeat: 0
        });

    }

    createClouds() {
        var scaleFactor = Phaser.Math.Between(0, 2)
        var y = Phaser.Math.Between(50, 150)
        gameState.cloud = this.add.image(-200, y, "ter_cloud").setOrigin(0.0).setScale(scaleFactor)
        var speed = Phaser.Math.Between(8000, 15000)
        this.cloudTween = this.tweens.add({
            targets: gameState.cloud,
            x: 1000,
            ease: 'Linear',
            duration: speed,
            repeat: 0,
            yoyo: false
        })
    }

    movePlayerRight() {
        gameState.text4.destroy()
        gameState.introPlayer.anims.play("move_player_right");
        gameState.introPlayer.flipX = false
        this.movePlayerTween = this.tweens.add({
            targets: gameState.introPlayer,
            x: config.width * 1.1,
            ease: 'Linear',
            duration: 4000,
            repeat: 0,
            yoyo: false,
            onComplete: this.nextLevel
        })
    }
    nextLevel() {
        game.scene.stop("StartLevel");
        game.scene.start("Level1");
    }

    showText4() {
        gameState.text4 = this.add.image(config.width * 0.5, config.height - 500, "img_text_man4").setScale(0.4).setDepth(2)
    }
}