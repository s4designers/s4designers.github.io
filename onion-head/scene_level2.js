class Level2 extends Level {
    constructor() {
        super("Level2")
        // this.theme = "bg_cave";
        this.createPlatforms = true;
        this.platformType = "ter_gravel_200x50"
        this.platformCeilingType = "ter_gravel_flipped_200x400"
        this.surfaceType = "ter_gravel_200x50"
        this.lethalSurface = "ter_lava_200x50"
        this.surfaceX = [0, 1, 2, null, null, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
        this.platformX = [600, 800, 900, 1200, 2410, 3800];
        this.platformY = [400, 400, 400, 350, 350, 100];
        this.platformCeilingX = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800];
        this.platformCeilingY = [100, 100, 100, 150, 150, 150, 200, 250, 250, 400, 400, 350, 300, 300, 200, 200, 100, 100, 100];
        this.createEnemyBatsInGame = true;
        this.createGunInGame = true;

        // adding ladder
        this.createLadderInGame = true;
        this.ladderX = [400, 3740, 1400]
        this.ladderY = [230, 100, 350]


        // adding the stars
        this.starX1 = Phaser.Math.Between(700, 800);
        this.starY1 = 300;
        this.starX2 = Phaser.Math.Between(1300, 2300);
        this.starY2 = 300;
        this.starX3 = Phaser.Math.Between(2000, 2400);
        this.starY3 = 350;
        this.starX4 = Phaser.Math.Between(3200, 3800);
        this.starY4 = 100;
        this.starX5 = Phaser.Math.Between(2900, 3300);
        this.starY5 = 100;

        this.light = null
        this.renderTexture = null

    }

    create() {
        gameState.level1Active = false;
        gameState.level2Active = true;
        gameState.level3Active = false;
        gameState.level4Active = false;
        gameState.level5Active = false;

        super.create();

        this.createStars();
        const x = 0
        const y = 0

        gameState.ladders.children.iterate((child) => {
            child.setTint(0x111111);
            child.setDepth(1)

        });

        var timer = this.time.addEvent({
            loop: false,
            startAt: 0,
            timeScale: 1,
            paused: false
        });

        this.add.image(0, 0, "bg_cave").setTint(0x111111).setOrigin(0, 0)

        this.moveRat();
        gameState.exitCave = this.physics.add.image(3850, 60, "obj_cave_entrance").setOrigin(0.5, 0.5).setDepth(2).setScale(2);
        gameState.exitCave.body.allowGravity = false;
        gameState.platforms.create(0, 230, "ter_gravel_200x400").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(200, 230, "ter_gravel_200x400").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(3000, 500, "ter_gravel_200x400").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(3100, 450, "ter_gravel_200x400").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(3200, 400, "ter_gravel_200x400").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(3300, 350, "ter_gravel_200x400").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(3400, 350, "ter_gravel_200x400").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(3800, 350, "ter_gravel_200x400").setOrigin(0, 0).refreshBody().setDepth(5);
        gameState.platforms.create(3600, 350, "ter_gravel_200x400").setOrigin(0, 0).refreshBody().setDepth(5);

        gameState.mushroom = new Mushroom(this, 510, 525).setOrigin(0.5, 0.5).setDepth(2)
        gameState.mushroom2 = new Mushroom(this, 1200, 525).setOrigin(0.5, 0.5).setDepth(2)
        gameState.thwomp = new Thwomp(this, 1800, 520)

        gameState.torchX = [350, 1310, 2500, 3968]
        gameState.torchY = [300, 375, 375, 125]

        for (var i = 0; i < gameState.torchX.length; i++) {

            gameState.torch = this.physics.add.sprite(gameState.torchX[i], gameState.torchY[i], "obj_torch").setScale(2).setDepth(8);
            gameState.torch.body.allowGravity = false;
            gameState.torch.anims.play("torch_light")

            var pic = this.add.image(0, 0, 'bg_cave').setOrigin(0, 0).setDepth(0);

            var spotlight = this.make.sprite({
                x: gameState.torchX[i],
                y: gameState.torchY[i],
                key: 'img_flashlight',
                add: false
            }).setScale(5);

            pic.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);

            this.tweens.add({
                targets: spotlight,
                alpha: 0.7,
                duration: 700,
                ease: 'Bounce.easeInOut',
                loop: -1,
                yoyo: true
            });

        }

        gameState.exitCave.disableBody(true, true);
        gameState.key2 = this.physics.add.image(3600, 340, "obj_key").setScale(0.85)
        gameState.key2.body.immovable = true;
        gameState.key2.body.allowGravity = false;
        gameState.key2.angle += 45;
        this.physics.add.collider(gameState.platforms, gameState.key);

        this.physics.add.overlap(gameState.key2, gameState.player, function () {
            gameState.hasKey2 = true;
            gameState.exitCave.enableBody(true, 3850, 60, true, true);
            gameState.key2.destroy();
            gameState.keyImage = this.add.image(760, 64, "obj_key").setScale(0.5);
            gameState.keyImage.setScrollFactor(0);
            gameState.keyImage.angle += 45;
        }, null, this)


        this.physics.add.overlap(gameState.player, gameState.exitCave, function () {
            gameState.isOnCaveEntrance = true;
        })
    }

    update() {
        super.update();

    }

    moveRat() {
        gameState.rat = new Rat(this, 300, 180, "obj_ally_rat").setOrigin(0.0).setScale(1.5).setDepth(2)
        gameState.rat.body.allowGravity = false;
        gameState.rat.anims.play("move_ally_rat")
        this.ratTween = this.tweens.add({
            targets: gameState.rat,
            x: -100,
            ease: 'Linear',
            duration: 4000,
            repeat: 0,
            yoyo: false
        })
    }
}

