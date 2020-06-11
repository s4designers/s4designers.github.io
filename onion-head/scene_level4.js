class Level4 extends Level {
    constructor() {
        super("Level4")

        this.theme = "bg_daylight_4000x2000";

        this.platformType = "ter_gravel_200x50"
        this.createPlatformsStair = true;
        this.createPlatforms = false;
        this.platformX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
        this.platformY = [1950, 1850, 1750, 1650, 1550, 1450, 1350, 1250, 1150, 1050, 950, 850, 800, 750, 700, 650, 600, 550, 550];

        this.createEnemyBatsInGame = false;
        this.createLadderInGame = false;
        this.createGunInGame = false;

    }

    create() {
        gameState.level1Active = false;
        gameState.level2Active = false;
        gameState.level3Active = false;
        gameState.level4Active = true;
        gameState.level5Active = false;

        super.create();

        gameState.background.setTint(0xff0000);
        gameState.platforms.create(0, 1950, "ter_gravel_200x50").setOrigin(0, 0).refreshBody().setDepth(0);

        // gameState.gun = new Gun(this, 40, 40)
        // gameState.spear = new Spear(this).setScale(0.08)

        this.createSnow()

        gameState.spaceship_img = this.add.image(-25, gameState.height - 95, "img_spaceship_idle").setDepth(4).setScale(0.8);

        this.time.addEvent({
            delay: 6000,
            callback: this.createSnowball,
            callbackScope: this,
            repeat: -1
        })

    }

    update() {
        super.update();
        if (gameState.snowball) {
            gameState.snowball.update()
        }

        if (gameState.player.x > 3900) {
            this.restartScene()
        }
    }

    createSnow() {
        gameState.particles = this.add.particles("ter_snowflake");

        gameState.emitter = gameState.particles.createEmitter({
            x: { min: 0, max: gameState.width },
            y: -5,
            lifespan: 2000,
            speedX: { min: -5, max: -200 },
            speedY: { min: 200, max: 400 },
            scale: { start: 0.6, end: 0 },
            quantity: 10,
        })

        gameState.emitter.setScrollFactor(1);
    }

    createSnowball() {
        gameState.snowball = new Snowball(this, 3600, 0).setScale(0.15).setDepth(5).setOrigin(0.71, 0.58);
    }


}

