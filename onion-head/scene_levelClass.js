class Level extends Phaser.Scene {
    constructor(key) {
        super({ key });
        this.levelKey = key;
        this.nextLevel = {
            Level1: "Level2",
            Level2: "Level3",
            Level3: "Level4",
            Level4: "Level5",
            Level5: "EndScene"
        };
    }

    create() {
        // gameState.demoMode = false;
        gameState.active = true;
        gameState.gameOver = false;
        gameState.isOnLadder = false;
        gameState.gunActive = false;
        gameState.hasKey = false;

        if (gameState.level1Active == true || gameState.level2Active == true || gameState.level3Active == true) {
            gameState.height = 600;
            gameState.width = 4000;
        } else if (gameState.level4Active == true) {
            gameState.height = 2000;
        } else if (gameState.level5Active == true) {
            gameState.width = 800;
            gameState.height = 600;
        }

        // Adding the background 
        gameState.background = this.add.image(0, 0, this.theme).setOrigin(0, 0).setDepth(-2);

        // Adding the ground and platforms 
        gameState.platforms = this.physics.add.staticGroup()
        gameState.lethalSurfaces = this.physics.add.staticGroup()

        if (this.createPlatforms == true) {
            for (var i = 0; i < this.surfaceX.length; i++) {
                gameState.surfaceX = this.surfaceX[i] * 200
                gameState.surfaceY = config.height - 50
                gameState.platforms.create(gameState.surfaceX, gameState.surfaceY, this.surfaceType).setOrigin(0, 0).setDepth(4).refreshBody();
                if (this.surfaceX[i] == null) {
                    gameState.lethalSurfaceX = i * 200
                    gameState.lethalSurfaceY = config.height - 30
                    gameState.lethalSurfaces.create(gameState.lethalSurfaceX, gameState.lethalSurfaceY, this.lethalSurface).setOrigin(0, 0).setDepth(4).refreshBody();
                }
            }

            for (var i = 0; i < this.platformX.length; i++) {
                gameState.platformX = this.platformX[i]
                gameState.platformY = this.platformY[i]
                gameState.platforms.create(gameState.platformX, gameState.platformY, this.platformType).setOrigin(0, 0).setDepth(4).refreshBody();
            }


            for (var i = 0; i < this.platformCeilingX.length; i++) {
                gameState.platformCeilingX = this.platformCeilingX[i]
                gameState.platformCeilingY = this.platformCeilingY[i]
                gameState.platforms.create(gameState.platformCeilingX, gameState.platformCeilingY, this.platformCeilingType).setOrigin(1, 1).setDepth(4).refreshBody();
            }
        }

        if (this.createPlatformsStair == true) {
            for (var i = 0; i < this.platformX.length; i++) {
                gameState.platformX = (this.platformX[i] * 200)
                gameState.platformY = this.platformY[i]
                gameState.platforms.create(gameState.platformX, gameState.platformY, this.platformType).setOrigin(0, 0).setDepth(4).refreshBody();
            }
        }

        //add treegroup
        gameState.trees = this.physics.add.staticGroup()


        // Adding the ladder
        gameState.ladders = this.physics.add.staticGroup();
        if (this.createLadderInGame == true) {
            for (var i = 0; i < this.ladderX.length; i++) {
                gameState.laddersX = this.ladderX[i];
                gameState.laddersY = this.ladderY[i];
                gameState.ladders.create(gameState.laddersX, gameState.laddersY, "obj_ladder").setDepth(0).setOrigin(0, 0).refreshBody();
            }
        }

        // // Adding the player 
        if (gameState.level4Active == true) {
            var playerY = 1904;
        } else if (gameState.level2Active == true) {
            var playerY = 184
        } else {
            var playerY = 504;
        }


        gameState.player = new Player(this, 100, playerY).setScale(1.5).setDepth(5000);

        // Adding star group
        gameState.stars = this.physics.add.group();

        //adding enemy group
        gameState.enemies = this.physics.add.group();

        // Adding a camera to follow player
        gameState.camera = this.cameras.main
        gameState.camera.setBounds(0, 0, gameState.width, gameState.height);
        this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
        gameState.camera.startFollow(gameState.player, true, 1, 1);

        // Adding three lives 
        gameState.lives = this.add.group()
        gameState.player.create();

        // Adding enemy weapon
        gameState.weapons = this.physics.add.group();


        // Adding the projectiles group
        gameState.projectiles = this.add.group();

        // Adding the enemy projectiles group
        gameState.enemyProjectiles = this.physics.add.group();


        // Adding the allies group
        gameState.allies = this.physics.add.group();

        // Adding the score text 
        gameState.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            fill: "#fff",
        }).setDepth(5);

        gameState.scoreText.setScrollFactor(0);

        // // Adding the cursors 
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        gameState.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        gameState.vKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

        // Adding colliders and overlaps
        this.physics.add.collider(gameState.enemies, gameState.platforms);

        gameState.enemyCollider = this.physics.add.overlap(gameState.player, gameState.enemies, this.hitByEnemy, null, this);

        // Time events 
        if (this.createGunInGame == true) {
            this.time.addEvent({
                delay: 1000,
                callback: this.createGun,
                callbackScope: this,
                loop: false,
            });
        }

        if (this.createEnemyBatsInGame == true) {
            if (gameState.level2Active == true) {
                var batAmount = 2;
            } else {
                var batAmount = 4;
            }
            this.time.addEvent({
                delay: 500,
                callback: this.createEnemyBat,
                callbackScope: this,
                repeat: batAmount
            });
        }

        this.time.addEvent({
            delay: 5000,
            callback: this.enemyBatBombThrown,
            callbackScope: this,
            loop: true
        })

        this.time.addEvent({
            delay: 2000,
            callback: this.birdPoopThrown,
            callbackScope: this,
            loop: true
        })
    }

    createGun() {
        gameState.gun = new Gun(this).setScale(1.5).setDepth(2);
        gameState.gunActive = true;
    };

    createEnemyBat() {
        if (gameState.gameOver == false) {
            gameState.enemyBat = new EnemyBat(this).setScale(2);
        }
    }

    createStars() {
        gameState.star1 = new Star(this, this.starX1, this.starY1).setDepth(5).setScale(1.2);
        gameState.star2 = new Star(this, this.starX2, this.starY2).setDepth(5).setScale(1.2);
        gameState.star3 = new Star(this, this.starX3, this.starY3).setDepth(5).setScale(1.2);
        gameState.star4 = new Star(this, this.starX4, this.starY4).setDepth(5).setScale(1.2);
        gameState.star5 = new Star(this, this.starX5, this.starY5).setDepth(5).setScale(1.2);
        if (gameState.level3Active == true) {
            gameState.star6 = new Star(this, this.starX6, this.starY6).setDepth(5).setScale(1.2);
            gameState.star7 = new Star(this, this.starX7, this.starY7).setDepth(5).setScale(1.2);
            gameState.star8 = new Star(this, this.starX8, this.starY8).setDepth(5).setScale(1.2);
            gameState.star9 = new Star(this, this.starX9, this.starY9).setDepth(5).setScale(1.2);
        }
    }

    enemyBatBombThrown() {
        gameState.livingEnemyBats = [];
        gameState.enemies.getChildren().forEach(function (enemy) {
            if (enemy instanceof EnemyBat) {
                gameState.livingEnemyBats.push(enemy);
            }
        }, this)

        if (gameState.livingEnemyBats.length > 0) {
            var randomIndex = Phaser.Math.Between(0, gameState.livingEnemyBats.length - 1);
            gameState.shootingBat = gameState.livingEnemyBats[randomIndex];
            gameState.enemyBatProjectile = new EnemyBatProjectile(this);
            this.physics.moveToObject(gameState.enemyBatProjectile, gameState.player, 250);
        }
    }

    birdPoopThrown() {
        gameState.livingBirds = [];
        gameState.allies.getChildren().forEach(function (target) {
            if (target instanceof Bird) {
                gameState.livingBirds.push(target);
            }
        }, this)

        if (gameState.livingBirds.length > 0) {
            var randomIndex = Phaser.Math.Between(0, gameState.livingBirds.length - 1);
            gameState.shootingBird = gameState.livingBirds[randomIndex];
            gameState.birdProjectile = new BirdProjectile(this);
        }
    }

    hitByEnemy() {
        gameState.life = gameState.lives.getFirstAlive();
        gameState.life.destroy();
        if (gameState.spaceship_img) {
            gameState.spaceship_img.destroy();
        }
        if (gameState.spaceshipActive == true) {
            gameState.spaceshipTween.stop();
            gameState.spaceship.destroy();
            gameState.spaceshipActive = false;
        }
        gameState.active = false;
        gameState.player.disableBody(true, true)
        if (gameState.hasGun == true) {
            gameState.gun.destroy();
            gameState.gunActive = false;
        };

        this.time.addEvent({
            delay: 500,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        })
    }

    hitByEnemyProjectile() {
        gameState.life = gameState.lives.getFirstAlive();
        gameState.life.destroy();
        gameState.active = false;
        gameState.player.disableBody(true, true);
        if (gameState.hasGun == true) {
            gameState.gun.destroy();
            gameState.gunActive = false;
        };

        this.time.addEvent({
            delay: 500,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        })
    }

    resetPlayer() {
        if (gameState.lives.countActive() >= 1) {

            if (gameState.level3Active == true) {
                this.createSpaceship();
            }

            if (gameState.level2Active == true) {
                var y = 184;
                gameState.player.enableBody(true, gameState.player.x = 100, gameState.player.y = 85, true, true);
            } else if (gameState.level1Active == true || gameState.level5Active == true) {
                var y = 490;
                gameState.player.enableBody(true, gameState.player.x = 100, gameState.player.y = 391, true, true);
            } else if (gameState.level3Active == true) {
                var y = 490;
                gameState.player.enableBody(true, gameState.player.x = 100, gameState.player.y = 391, true, true);
                gameState.camera.stopFollow();
                gameState.camera.startFollow(gameState.player, true, 1, 1);
            } else if (gameState.level4Active == true) {
                var y = 1904
                gameState.player.enableBody(true, gameState.player.x = 100, gameState.player.y = 1805, true, true);
            }

            gameState.hasGun = false;
            gameState.playerTween = this.tweens.add({
                targets: gameState.player,
                y: y,
                ease: 'Linear',
                duration: 1000,
                yoyo: false,
                onComplete: function () {
                    gameState.active = true;
                    gameState.isLookingRight = true;
                    gameState.isLookingLeft = false;
                    if (gameState.level1Active == true || gameState.level2Active == true || gameState.level5Active == true) {

                        if (gameState.gunActive == false) {
                            this.time.addEvent({
                                delay: 1000,
                                callback: this.createGun(),
                                callbackScope: this,
                                loop: false
                            });
                        }
                    }
                },
                onCompleteScope: this
            })
        }
    }

    restartScene() {
        gameState.hasGun = false;
        gameState.gunActive = false;
        if (gameState.keyImage) {
            gameState.keyImage.destroy();
        };
        this.scene.stop(this.levelKey);
        gameState.isLookingRight = true;
        gameState.isLookingLeft = false;
        this.scene.start(this.nextLevel[this.levelKey]);
    }

    startGameOverScene() {
        this.scene.stop(this.levelKey);
        this.scene.start("GameOverScene");
    }


    update() {
        //check for demoMode
        if(gameState.demoMode == true){
            this.physics.world.removeCollider(gameState.bombCollider);
            this.physics.world.removeCollider(gameState.birbpoopCollider);
            this.physics.world.removeCollider(gameState.fireballCollider);
            this.physics.world.removeCollider(gameState.lethalCollider);
            this.physics.world.removeCollider(gameState.enemyCollider);
            this.physics.world.removeCollider(gameState.spaceshipOverlap);
            gameState.hasKey = true;
        }

        // Update score text 
        gameState.scoreText.setText("Score: " + gameState.score);

        // Including update from Player.js
        gameState.player.update();

        // Gun position  
        if (gameState.hasGun == true && gameState.isLookingRight) {
            gameState.gun.flipX = false;
            gameState.gun.x = gameState.player.x + 16;
            gameState.gun.y = gameState.player.y + 16;

        } else if (gameState.hasGun == true && gameState.isLookingLeft) {
            gameState.gun.flipX = true;
            gameState.gun.x = gameState.player.x - 16;
            gameState.gun.y = gameState.player.y + 16;
        }

        // Disable/enable gun 
        if (Phaser.Input.Keyboard.JustDown(gameState.cKey) && gameState.isOnLadder == false && gameState.hasGun == true) {
            gameState.hasGunInPocket = true;
            gameState.hasGun = false;
            gameState.gun.visible = false;

        } else if (
            Phaser.Input.Keyboard.JustDown(gameState.vKey) && gameState.isOnLadder == false && gameState.hasGunInPocket == true) {
            gameState.hasGunInPocket = false;
            gameState.hasGun = true;
            gameState.gun.visible = true;

        }


        //overlap enemies ship
        if (gameState.level3Active == true && gameState.spaceshipActive == true) {
            if (gameState.spaceship.x > 3400) {
                this.physics.world.removeCollider(gameState.spaceshipOverlap)
            }
        }

        // Friendly bullet
        if (Phaser.Input.Keyboard.JustDown(gameState.spacebar) && (gameState.hasGun == true || gameState.spaceshipActive == true)) {

            if (gameState.spaceshipActive == true) {
                var bullet = new Bullet(this).setDepth(4).setScale(1.5);
            } else {
                var bullet = new Bullet(this)
            }

            if (gameState.cursors.left.isDown || gameState.isLookingLeft == true && gameState.hasGun == true) {
                bullet.angle += 270;
                bullet.body.velocity.x = -300;

            } else if (gameState.cursors.right.isDown || gameState.isLookingRight == true && gameState.hasGun == true) {
                bullet.angle += 90;
                bullet.body.velocity.x = 300;
            } else if (gameState.spaceshipActive == true) {
                bullet.angle += 90;
                bullet.body.velocity.x = 300;
            }

        }

        // Including update from bullet.js

        gameState.projectiles.getChildren().forEach(function (projectile) {
            if (projectile instanceof Bullet) {
                projectile.update();
            }
        }, this)


        gameState.enemies.getChildren().forEach(function (enemy) {
            if (enemy instanceof EnemyBird) {
                enemy.update();
            }
        }, this)

        // Including update from enemyBatProjectile.js 
        gameState.enemyProjectiles.getChildren().forEach(function (enemyprojectile) {
            if (enemyprojectile instanceof EnemyBatProjectile) {
                enemyprojectile.update();
            }
        }, this)

        // Restart level 
        if (gameState.isOnCaveEntrance == true) {

            if ((gameState.level1Active == true && gameState.hasKey == true) || gameState.level2Active == true) {
                this.time.addEvent({
                    delay: 1000,
                    callback: this.restartScene,
                    callbackScope: this,
                    loop: false
                });
            }
            gameState.isOnCaveEntrance = false;
        }

        // Game over
        if (gameState.gameOver == true) {
            gameState.hasGun = false;
            gameState.gunActive = false;
            this.physics.pause();
            this.anims.pauseAll();
            this.tweens.pauseAll();
            gameState.player.setTint(0xff0000);

            if (gameState.hasGun == true) {
                gameState.gun.setTint(0xff0000);
            }
            this.time.addEvent({
                delay: 2000,
                callback: this.startGameOverScene,
                callbackScope: this,
                loop: false
            })
        }
    }
}
