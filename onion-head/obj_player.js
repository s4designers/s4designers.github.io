class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, "obj_player_man");
    
        gameState.isLookingLeft = false;
        gameState.isLookingRight = true;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        scene.physics.add.collider(this, gameState.platforms, function () {
            if (gameState.player.body.touching.down) {
                gameState.isOnPlatform = true;
            }
        }, null, scene);
        scene.physics.add.overlap(this, gameState.ladders, function () {
            gameState.isOnLadder = true;
        }, null, scene);
        scene.physics.add.overlap(this, gameState.door, function () {
            gameState.isOnDoor = true;
        }, null, scene);
        gameState.lethalCollider = scene.physics.add.overlap(this, gameState.lethalSurfaces, function () {
            scene.hitByEnemy()
        }, null, scene);

        // start position of lives
        gameState.lifeX = config.width;
        gameState.lifeY = 32;

        // adjusting collision boundaries after 1 second
        scene.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: scene,
            loop: true,
        });

        function delayDone() {
            gameState.player.setSize(gameState.player.width, gameState.player.height, true);
        };
    }

    create() {
        for (var i = 0; i < 3; i++) {
            gameState.life = gameState.lives.create(
                gameState.lifeX - 100 + 30 * i,
                gameState.lifeY,
                "obj_lives").setScale(2.5);
            gameState.life.setScrollFactor(0).setDepth(5);                                      // DEPTH TOEGEVOEGD
        };
    }

    update() {
        // Player movements 
        if (gameState.active == true) {
            if (gameState.cursors.left.isDown && gameState.gameOver == false) {
                gameState.player.setVelocityX(-160);
                gameState.player.anims.play("move_player_left", true);
                gameState.isLookingLeft = true;
                gameState.isLookingRight = false;

                if ((gameState.player.body.y < 472) && gameState.isOnLadder) {
                    gameState.player.anims.play("move_player_up", true);
                    gameState.player.anims.stop("move_player_left", true);
                    gameState.player.anims.stop("move_player_right", true);
                    gameState.isLookingLeft = false;
                    gameState.isLookingRight = false;
                }

            } else if (gameState.cursors.right.isDown && gameState.gameOver == false) {
                gameState.player.setVelocityX(160);
                gameState.player.anims.play("move_player_right", true);
                gameState.isLookingLeft = false;
                gameState.isLookingRight = true;

                if ((gameState.player.body.y < 472) && gameState.isOnLadder) {
                    gameState.player.anims.play("move_player_up", true);
                    gameState.player.anims.stop("move_player_left", true);
                    gameState.player.anims.stop("move_player_right", true);
                    gameState.isLookingLeft = false;
                    gameState.isLookingRight = false;
                }
            } else if ((gameState.cursors.up.isDown || gameState.cursors.down.isDown) && gameState.isOnLadder == true) {
                gameState.player.anims.play("move_player_up", true);
                gameState.player.setVelocityX(0);

            } else {
                gameState.player.setVelocityX(0);
                gameState.player.anims.stop("move_player_left", true);
                gameState.player.anims.stop("move_player_right", true);

                if (gameState.isLookingLeft == true && gameState.isOnLadder == false) {
                    gameState.player.anims.play("player_looking_left", true);

                } else if (gameState.isLookingRight == true && gameState.isOnLadder == false) {
                    gameState.player.anims.play("player_looking_right", true);
                }
            }
        } else if (gameState.active == false) {
            gameState.player.setVelocityX(0)
            gameState.player.anims.stop("move_player_left", true);
            gameState.player.anims.stop("move_player_right", true);
            gameState.player.anims.play("move_player_idle", true)
        }

        // Climbing ladder 
        if (gameState.isOnLadder == true) {
            gameState.isLookingLeft = false;
            gameState.isLookingRight = false;
            if (gameState.hasGun == true) {
                gameState.gun.visible = false;
                gameState.spacebar.enabled = false;
            }

            gameState.isOnPlatform = false;

            if (gameState.cursors.up.isDown) {
                gameState.player.body.velocity.y = -160;

            } else if (gameState.cursors.down.isDown) {
                gameState.player.body.velocity.y = 160;

            } else if (!gameState.cursors.up.isDown && !gameState.cursors.down.isDown) {
                gameState.player.body.velocity.y = -8;
                gameState.player.body.gravity.y = 0;
            }
        } else if (gameState.cursors.up.isDown && gameState.isOnPlatform == true && gameState.player.body.touching.down && gameState.isOnLadder == false) {
            gameState.player.setVelocityY(-330);
            gameState.isOnPlatform = false;
        }

        if (gameState.isOnLadder == false && gameState.hasGun == true) {
            gameState.gun.visible = true;
            gameState.spacebar.enabled = true;
        }

        gameState.isOnLadder = false;

        if (gameState.lives.countActive() < 1) {
            gameState.gameOver = true;
        }
    }
}