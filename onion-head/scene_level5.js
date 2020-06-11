class Level5 extends Level {
    constructor() {
        super("Level5")
        
        this.theme = "bg_daylight_4000x600";
    
        this.surfaceType = "ter_gravel_200x50"
        this.createPlatforms = true;
        this.surfaceX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        this.platformX = [];
        this.platformCeilingX = [];
        this.createEnemyBatsInGame = false;
        this.createLadderInGame = false;
        this.createGunInGame = true;

    }

    create() {
        gameState.level1Active = false;
        gameState.level2Active = false;
        gameState.level3Active = false;
        gameState.level4Active = false;
        gameState.level5Active = true;

        super.create();

        gameState.background.setTint(0xff0000);

        this.createSnow()

        gameState.minotaur = new EnemyMinotaur(this, config.width * 0.75, config.height - 118).setOrigin(0.5, 0.5).setScale(2)
        gameState.minotaur.body.immovable = true;
        gameState.minotaur.body.allowGravity = false;

        gameState.bgBar = this.add.image((config.width * 0.5 - 150), config.height * 0.05, "obj_statusBar").setTint(0xFF0000).setOrigin(0, 0.5);
        gameState.healthBar = this.add.image((config.width * 0.5 - 150), config.height * 0.05, "obj_statusBar").setOrigin(0, 0.5);

        this.add.image(config.width * 0.9, config.height - 135, "img_cage").setOrigin(0.5, 0.5).setScale(1.3)
        
        this.time.addEvent({
            delay: 1000,
            callback: this.endImage,
            callbackScope: this,
            loop: false,
        })

        this.time.addEvent({
            delay: 4000,
            callback: this.deleteEndImage,
            callbackScope: this,
            loop: false,
        })

        this.time.addEvent({
            delay: 5000,
            callback: this.fireballTimer,
            callbackScope: this,
            loop: false,
        })
    }

    update() {
        super.update();
        
        if (gameState.minotaur.health <= 0){
            gameState.minotaur.disableBody(true, true);
            gameState.fireBallTimer.remove();
            this.time.addEvent({
                delay: 2000,
                callback: this.restartScene,
                callbackScope: this,
                loop: false,
            })
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

    createFireball(){
        var fireBall = new MinotaurProjectile(this).setScale(0.15).setDepth(5).setOrigin(0.71, 0.58).setTint(0xFF0000);
        fireBall.body.allowGravity = true;
        this.physics.moveTo(fireBall, config.width/2 , 0, Phaser.Math.Between(300, 600));
    }

    fireballTimer(){
        gameState.fireBallTimer = this.time.addEvent({
            delay: 500,
            callback: this.createFireball,
            callbackScope: this,
            loop: true,  
        });
    }

    endImage(){
        gameState.endImage = this.add.image(config.width * 0.5, config.height - 450, "img_text_endFight").setScale(0.1).setDepth(2)
    }

    deleteEndImage(){
        gameState.endImage.destroy()
    }
}

