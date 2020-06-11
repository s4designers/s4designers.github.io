class IntroScene extends Phaser.Scene {
    constructor() {
        super("IntroScene")
        this.theme = "bg_daylight"
    }

    create() {

        var windConfig = {
            mute: false,
            volume: 0.3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 2000,
        }

       var windSound = this.sound.add("storm", windConfig);
       windSound.play();

        gameState.background = this.add.image(0, 0, this.theme).setOrigin(0, 0);
        var house = this.add.image(config.width * 0.05, config.height - 50, "img_house").setOrigin(0, 1).setScale(0.7);
        gameState.grass = this.physics.add.image(config.width * 0.5, config.height - 25, "ter_grass_800x50").setOrigin(0.5, 0.5).setDepth(2);
        gameState.grass.body.immovable = true;
        gameState.grass.body.allowGravity = false;
        gameState.introTree = this.add.image(config.width * 0.70, config.height - 42, "ter_tree_pine1").setOrigin(0, 1).setScale(2).setDepth(1);

        // Adding the enemies group
        gameState.enemies = this.physics.add.group();

        this.time.addEvent({
            delay: 1,
            callback: this.createClouds,
            callbackScope: this,
            repeat: 0
        });


        this.time.addEvent({
            delay: 2000,
            callback: this.shakeScreen,
            callbackScope: this,
            loop: false
        })

        this.time.addEvent({
            delay: 2500,
            callback: this.createDarkClouds,
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: 4500,
            callback: this.moveMinotaurLeft,
            callbackScope: this,
            repeat: 0
        });

        this.time.addEvent({
            delay: 2500,
            callback: this.treeExplosion,
            callbackScope: this,
            repeat: 0
        });


        this.time.addEvent({
            delay: 9000,
            callback: this.displayPlayers,
            callbackScope: this,
            repeat: 0
        });

        this.time.addEvent({
            delay: 12000,
            callback: this.kidnapWoman,
            callbackScope: this,
            repeat: 0
        });

        this.time.addEvent({
            delay: 14000,
            callback: this.moveMinotaurRight,
            callbackScope: this,
            repeat: 0
        });


        this.time.addEvent({
            delay: 6000,
            callback: this.showText1,
            callbackScope: this,
            repeat: 0
        });

        this.time.addEvent({
            delay: 10000,
            callback: this.showText2,
            callbackScope: this,
            repeat: 0
        });


        this.time.addEvent({
            delay: 15000,
            callback: this.showText3,
            callbackScope: this,
            repeat: 0
        });
    }

    shakeScreen() {
        this.cameras.main.shake(2500, .01, true, function (camera, progress) {
            if (progress > 0.2) {
                gameState.background.setTint(0xff0000);
                gameState.cloud.setTint(0x990000)
                gameState.grass.setTint(0x7d2c0c)
                gameState.introTree.visible = false
                gameState.deadTree = this.add.image(config.width * 0.70, config.height - 23, "ter_tree_dead").setOrigin(0, 1).setScale(2.5).setDepth(1)

            }
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

    createDarkClouds() {
        var scaleFactor = Phaser.Math.Between(0, 2)
        var y = Phaser.Math.Between(50, 150)
        gameState.darkCloud = this.add.image(-200, y, "ter_cloud").setOrigin(0.0).setScale(scaleFactor)
        gameState.darkCloud.setTint(0x990000)
        var speed = Phaser.Math.Between(8000, 15000)
        this.cloudTween = this.tweens.add({
            targets: gameState.darkCloud,
            x: 1000,
            ease: 'Linear',
            duration: speed,
            repeat: 0,
            yoyo: false
        })

    }

    moveMinotaurLeft() {
        gameState.minotaur = new EnemyMinotaur(this, config.width * 0.99, config.height - 120).setOrigin(0.5, 0.5).setScale(2)
        gameState.minotaur.anims.play("move_minotaur_left")
        this.minotaurLeftTween = this.tweens.add({
            targets: gameState.minotaur,
            x: config.width * 0.5,
            ease: 'Linear',
            duration: 4000,
            repeat: 0,
            yoyo: false,
            onComplete: this.stopAnimMinotaur
        })
    }       

    stopAnimMinotaur() {
        gameState.minotaur.anims.stop("move_minotaur_left")
    }

    treeExplosion() {
        var explosion = new Explosion(this, gameState.introTree.x + 85, gameState.introTree.y - 200).setScale(10).setDepth(2)
    }

    displayPlayers() {
        gameState.womanIdle = this.add.image(config.width * 0.33, config.height - 78, "img_woman_idle").setOrigin(0.5, 0.5).setScale(1.3)
        gameState.manIdle = this.add.image(config.width * 0.28, config.height - 83, "img_man_idle").setOrigin(0.5, 0.5).setScale(1.5)
    }

    kidnapWoman() {
        gameState.womanIdle.x = gameState.minotaur.x - 10
        gameState.womanIdle.y = gameState.minotaur.y + 10
        gameState.womanIdle.angle += 270
    }

    nextScene() {
        game.scene.stop("IntroScene")
        game.scene.start("StartLevel")
    }

    moveMinotaurRight() {
        gameState.womanIdle.angle += 180
        gameState.minotaur.anims.play("move_minotaur_right")
        this.minotaurRightTween = this.tweens.add({
            targets: gameState.minotaur,
            x: config.width * 1.5,
            ease: 'Linear',
            duration: 7000,
            repeat: 0,
            yoyo: false,
            onComplete: this.nextScene
        })
    }

    // Story text images
    showText1() {
        gameState.text1 = this.add.image(config.width * 0.5, config.height - 500, "img_text_minotaur1").setScale(0.4).setDepth(2)
    }

    showText2() {
        gameState.text1.destroy()
        gameState.text2 = this.add.image(config.width * 0.5, config.height - 500, "img_text_man2").setScale(0.4).setDepth(2)
    }

    showText3() {
        gameState.text2.destroy()
        gameState.text3 = this.add.image(config.width * 0.5, config.height - 500, "img_text_minotaur3").setScale(0.4).setDepth(2)
    }

    moveWomanIdle() {
        gameState.womanIdle.x = gameState.minotaur.x + 6
        gameState.womanIdle.y = gameState.minotaur.y + 10
    }

    update() {
        this.time.addEvent({
            delay: 14000,
            callback: this.moveWomanIdle,
            callbackScope: this,
            repeat: 0
        });
    }

}
