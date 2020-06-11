class Level3 extends Level {
    constructor() {
        super("Level3")

        this.theme = "bg_daylight_4000x600";
        this.createPlatforms = false;
        this.createEnemyBatsInGame = false;
        this.createLadderInGame = false;
        this.createGunInGame = false;

        // adding the stars
        this.starX1 = Phaser.Math.Between(200, 600);
        this.starY1 = Phaser.Math.Between(20, 580);
        this.starX2 = Phaser.Math.Between(600, 1000);
        this.starY2 = Phaser.Math.Between(20, 580);
        this.starX3 = Phaser.Math.Between(1000, 1400);
        this.starY3 = Phaser.Math.Between(20, 580);
        this.starX4 = Phaser.Math.Between(1400, 1800);
        this.starY4 = Phaser.Math.Between(20, 580);
        this.starX5 = Phaser.Math.Between(1800, 2200);
        this.starY5 = Phaser.Math.Between(20, 580);
        this.starX6 = Phaser.Math.Between(2200, 2600);
        this.starY6 = Phaser.Math.Between(20, 580);
        this.starX7 = Phaser.Math.Between(2600, 3000);
        this.starY7 = Phaser.Math.Between(20, 580);
        this.starX8 = Phaser.Math.Between(3000, 3400);
        this.starY8 = Phaser.Math.Between(20, 580);
        this.starX9 = Phaser.Math.Between(3400, 3800);
        this.starY9 = Phaser.Math.Between(20, 580);

    }

    create() {
        gameState.level1Active = false;
        gameState.level2Active = false;
        gameState.level3Active = true;
        gameState.level4Active = false;
        gameState.level5Active = false;

        super.create();

        gameState.hasGun = false;
        gameState.spaceshipOnPlatform = false;
    
        gameState.platforms.create(0, 550, "ter_gravel_200x50").setOrigin(0, 0).setDepth(4).refreshBody();
        gameState.platforms.create(3800, 550, "ter_gravel_200x50").setOrigin(0, 0).setDepth(4).refreshBody();

        this.add.image(-100, 300, "ter_mountain_darktint").setOrigin(0, 0).setDepth(3);
        this.add.image(200, 200, "ter_mountain_darktint").setOrigin(0, 0).setDepth(3);
        this.add.image(400, 300, "ter_mountain").setOrigin(0, 0).setDepth(3);
        this.add.image(700, 100, "ter_mountain_darktint").setOrigin(0, 0).setDepth(3);
        this.add.image(1000, 200, "ter_mountain").setOrigin(0, 0).setDepth(3);
        this.add.image(1400, 400, "ter_mountain").setOrigin(0, 0).setDepth(3);
        this.add.image(1600, 100, "ter_mountain").setOrigin(0, 0).setDepth(3);
        this.add.image(2000, 200, "ter_mountain_darktint").setOrigin(0, 0).setDepth(3);
        this.add.image(2100, 300, "ter_mountain_darktint").setOrigin(0, 0).setDepth(3);
        this.add.image(2400, 100, "ter_mountain").setOrigin(0, 0).setDepth(3);
        this.add.image(2600, 200, "ter_mountain").setOrigin(0, 0).setDepth(3);
        this.add.image(2900, 400, "ter_mountain_darktint").setOrigin(0, 0).setDepth(3);
        this.add.image(3200, 300, "ter_mountain").setOrigin(0, 0).setDepth(3);
        this.add.image(3500, 100, "ter_mountain").setOrigin(0, 0).setDepth(3);

        this.time.addEvent({
            delay: 0,
            callback: this.createStartingClouds,
            callbackScope: this,
            loop: false
        });

        this.time.addEvent({
            delay: 1000,
            callback: this.createClouds,
            callbackScope: this,
            repeat: -1
        });

        this.time.addEvent({
            delay: 0,
            callback: this.createStartingBirds,
            callbackScope: this,
            loop: false
        })

        this.time.addEvent({
            delay: 1500,
            callback: this.createBirds,
            callbackScope: this,
            loop: true
        })

        gameState.spaceshipActive = false;
        this.createSpaceship();
        this.createStars()

    }

    createSpaceship() {
        gameState.spaceship_img = this.physics.add.image(275, config.height - 60, "img_spaceship_idle").setDepth(4).setScale(0.8);
        gameState.spaceship_img.body.allowGravity = false;
        this.physics.add.overlap(gameState.player, gameState.spaceship_img, function () {
            gameState.spaceship_img.destroy();
            gameState.player.disableBody(true, true);
            gameState.spaceship = new Spaceship(this, 300, config.height - 60).setDepth(4).setScale(0.8);
            gameState.spaceshipActive = true;
            this.enableCameraSpaceship()
            gameState.spaceship.anims.play("move_spaceship_right", true);
            gameState.spaceshipTween = this.tweens.add({
                targets: gameState.spaceship,
                x: 4000,
                ease: 'Linear',
                duration: 30000,
            })
        }, null, this)
    }

    createStartingClouds() {
        var scaleFactor = Phaser.Math.Between(0, 2)
        var y = Phaser.Math.Between(50, 150)

        for (var i = 1; i <= 7; i++) {
            var x = i * 300
            gameState.cloud = this.physics.add.image(x, y, "ter_cloud").setScale(scaleFactor).setDepth(2);
            gameState.cloud.body.allowGravity = false;

            var speed = Phaser.Math.Between(24000, 30000)
            this.tweens.add({
                targets: gameState.cloud,
                x: 4200,
                ease: 'Linear',
                duration: speed,
                repeat: 0,
                yoyo: false
            })
        }
    }

    createClouds() {
        var scaleFactor = Phaser.Math.Between(0, 2)
        var y = Phaser.Math.Between(50, 150)
        gameState.cloud = this.physics.add.image(-200, y, "ter_cloud").setScale(scaleFactor).setDepth(2);

        gameState.cloud.body.allowGravity = false;

        var speed = Phaser.Math.Between(30000, 36000)
        this.tweens.add({
            targets: gameState.cloud,
            x: 4200,
            ease: 'Linear',
            duration: speed,
            repeat: 0,
            yoyo: false
        })
    }

    createStartingBirds() {
        for (var i = 1; i <= 14; i++) {
            var x = i * 250;
            var speed = i * 1500
            gameState.enemyBird = new EnemyBird(this, x, speed).setScale(1.5).setDepth(4);
        }
    }

    createBirds() {
        gameState.enemyBird = new EnemyBird(this, 4000, 20000).setScale(1.5).setDepth(4)
    }

    enableCameraSpaceship() {
        gameState.camera.stopFollow();
        gameState.camera.startFollow(gameState.spaceship, true, 1, 1)
    }

    update() {
        super.update()

        if (gameState.spaceshipActive == true) {
            gameState.spaceship.update();
        }

        if (gameState.spaceshipActive == true) {
            if (gameState.spaceship.x > 3800) {
                this.time.addEvent({
                    delay: 1500,
                    callback: this.restartScene,
                    callbackScope: this,
                    loop: false
                });
            }
        }

        
    }
}