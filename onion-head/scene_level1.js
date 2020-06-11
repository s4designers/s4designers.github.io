class Level1 extends Level {
    constructor() {
        super("Level1")
        this.theme = "bg_forrest"
        this.createPlatforms = true;
        this.platformType = "ter_grass_200x50"
        this.surfaceType = "ter_grass_200x50"
        this.lethalSurface = "ter_water_200x30"
        this.surfaceX = [0, 1, null, 3, 4, 5, null, 7, null, 9, 10, 11, 12, null, null, null, 16, 17, 18, 19]
        this.platformX = [0, 200, 400, 700, 1300, 1500, 1700, 1900, 2100, 2400, 2600, 2800, 2900, 3100, 3440, 3540];
        this.platformY = [200, 200, 200, 300, 150, 200, 200, 150, 150, 150, 150, 400, 175, 175, 230, 230];
        this.platformCeilingX = [];
        this.createEnemyBatsInGame = false;
        this.createGunInGame = true;

        // adding ladder
        this.createLadderInGame = true;
        this.ladderX = [3740]
        this.ladderY = [230]

        // adding the stars
        this.starX1 = Phaser.Math.Between(10, 590);
        this.starY1 = 0;
        this.starX2 = Phaser.Math.Between(1300, 2300);
        this.starY2 = 0;
        this.starX3 = Phaser.Math.Between(2000, 2400);
        this.starY3 = 350;
        this.starX4 = Phaser.Math.Between(3200, 3800);
        this.starY4 = 350;
        this.starX5 = Phaser.Math.Between(2900, 3300);
        this.starY5 = 0;    

    }

    create() {
        gameState.level1Active = true;
        gameState.level2Active = false;
        gameState.level3Active = false;
        gameState.level4Active = false;
        gameState.level5Active = false;

        gameState.score = 0;

        this.music = this.sound.add("music");
        
        var musicConfig = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        this.music.play(musicConfig)

        super.create();


        gameState.hasKey = false;

        gameState.bush = this.add.image(330, 185, "ter_bush").setScale(0.20)
        gameState.bush = this.add.image(350, 185, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(370, 185, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(800, 535, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(1180, 390, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(1160, 390, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(1420, 535, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(1440, 535, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(1450, 535, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(1820, 535, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(1840, 535, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(1850, 535, "ter_bush").setScale(0.20)
        gameState.bush = this.add.image(1920, 535, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(2020, 535, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(2040, 535, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(2050, 535, "ter_bush").setScale(0.20)
        gameState.bush = this.add.image(2220, 535, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(2240, 535, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(2250, 535, "ter_bush").setScale(0.20)
        gameState.bush = this.add.image(2220, 135, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(2240, 135, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(2250, 135, "ter_bush").setScale(0.20)
        gameState.bush = this.add.image(2420, 535, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(2440, 535, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(2450, 535, "ter_bush").setScale(0.20)
        gameState.bush = this.add.image(2500, 380, "ter_bush").setScale(0.20)
        gameState.bush = this.add.image(2520, 380, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(2540, 380, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(2620, 125, "ter_bush").setScale(0.25)
        gameState.bush = this.add.image(2640, 125, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(2650, 125, "ter_bush").setScale(0.20)
        gameState.bush = this.add.image(3120, 150, "ter_bush").setScale(0.20)
        gameState.bush = this.add.image(3140, 150, "ter_bush").setScale(0.30)
        gameState.bush = this.add.image(3160, 150, "ter_bush").setScale(0.25)

        gameState.cave = this.physics.add.image(3900, 500, "ter_grass_200x200").setDepth(-1);
        gameState.cave.body.allowGravity = false;
        gameState.cave.setImmovable(true);
        gameState.platforms.create(3800, 400, "ter_grass_200x50").setOrigin(0, 0).refreshBody().setDepth(0);
        gameState.platforms.create(2300, 500, "ter_grass_200x100").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(2400, 400, "ter_grass_200x200").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(900, 500, "ter_grass_200x100").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(1000, 400, "ter_grass_200x200").setOrigin(0, 0).refreshBody().setDepth(5);

        gameState.trees.create(100, 135, "ter_tree_pine1").setDepth(-1).refreshBody()
        gameState.trees.create(250, 120, "ter_tree_oak1").setDepth(-1).setScale(0.5).refreshBody()
        gameState.trees.create(150, 470, "ter_tree_blossom").setDepth(0).setScale(0.5).refreshBody()
        gameState.trees.create(790, 200, "ter_tree_pine2").setDepth(-1).setScale(0.5).refreshBody()
        gameState.trees.create(1100, 340, "ter_tree_pine1").setDepth(0).setScale(1.2).refreshBody()

        gameState.trees.create(1550, 470, "ter_tree_oak1").setDepth(-1).setScale(0.5).refreshBody()
        gameState.trees.create(1800, 115, "ter_tree_pine2").setDepth(-1).setScale(0.4).refreshBody()
        gameState.trees.create(2020, 115, "ter_tree_oak1").setDepth(-1).setScale(0.3).refreshBody()
        gameState.trees.create(2100, 450, "ter_tree_pine2").setDepth(-1).setScale(0.50).refreshBody()
        gameState.trees.create(2900, 330, "ter_tree_oak2").setDepth(-1).setScale(0.50).refreshBody()
        gameState.trees.create(3300, 470, "ter_tree_blossom").setDepth(-1).setScale(0.50).refreshBody()

        gameState.key = this.physics.add.image(3700, 500, "obj_key").setScale(0.85)
        gameState.key.angle += 45;
        this.physics.add.collider(gameState.platforms, gameState.key);

        gameState.entranceCave = this.physics.add.image(gameState.width * 0.98, 510, "obj_cave_entrance").setDepth(-1).setScale(2);
        gameState.entranceCave.body.allowGravity = false;
        gameState.entranceCave.setImmovable(true);
        gameState.entranceCave.disableBody(true, true);
        this.physics.add.overlap(gameState.entranceCave, gameState.player, function () {
            gameState.isOnCaveEntrance = true;
        }, null, this)

        this.physics.add.overlap(gameState.key, gameState.player, function () {
            gameState.hasKey = true;
            gameState.entranceCave.enableBody(true, gameState.width * 0.98, 510, true, true);
            gameState.key.destroy();
            gameState.keyImage = this.add.image(760, 64, "obj_key").setScale(0.5);
            gameState.keyImage.setScrollFactor(0);
            gameState.keyImage.angle += 45;
        }, null, this)

        this.createStars();
        this.playAnimsBirdRight();
        this.playAnimsBirdLeft();
        this.playAnimsFrogOne();
        this.playAnimsFrogTwo();
    }

    update() {
        super.update()
    }

    playAnimsBirdRight() {
        for (var i = 0; i < 3; i++) {
            var randomBirdX = Phaser.Math.Between(10, 1000);
            var randomBirdY = Phaser.Math.Between(20, 50);
            var randomX = Phaser.Math.Between(gameState.width - 500, gameState.width - 10);
            var randomSpeed = Phaser.Math.Between(18000, 22000);
            gameState.bird = new Bird(this, randomBirdX, randomBirdY).setOrigin(0.5, 0.5).setScale(2)
            gameState.bird.anims.play("move_bird_right")
            this.birdTween = this.tweens.add({
                targets: gameState.bird,
                x: randomX,
                ease: 'Linear',
                duration: randomSpeed,
                repeat: -1,
                yoyo: true,
                flipX: true
            })
        }
    }

    playAnimsBirdLeft() {
        for (var i = 0; i < 3; i++) {
            var randomBirdX = Phaser.Math.Between(gameState.width - 1000, gameState.width - 10);
            var randomBirdY = Phaser.Math.Between(20, 50);
            var randomX = Phaser.Math.Between(10, 500);
            var randomSpeed = Phaser.Math.Between(18000, 22000);
            gameState.bird = new Bird(this, randomBirdX, randomBirdY).setOrigin(0.5, 0.5).setScale(2)
            gameState.bird.anims.play("move_bird_left")
            this.birdTween = this.tweens.add({
                targets: gameState.bird,
                x: randomX,
                ease: 'Linear',
                duration: randomSpeed,
                repeat: -1,
                yoyo: true,
                flipX: true
            })
        }
    }

    playAnimsFrogOne() {
        gameState.frog = new Frog(this, 650, 500).setOrigin(0.5, 0.5).setScale(2)
        gameState.frog.anims.play("move_frog_right")
        this.frogTween = this.tweens.add({
            targets: gameState.frog,
            x: 850,
            ease: 'Linear',
            duration: 4000,
            repeat: -1,
            yoyo: true,
            flipX: true
        })
    }

    playAnimsFrogTwo() {
        gameState.frog = new Frog(this, 1820, 500).setOrigin(0.5, 0.5).setScale(2)
        gameState.frog.anims.play("move_frog_right")
        this.frogTween = this.tweens.add({
            targets: gameState.frog,
            x: 2000,
            ease: 'Linear',
            duration: 4000,
            repeat: -1,
            yoyo: true,
            flipX: true
        })
    }

}