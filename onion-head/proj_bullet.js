class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        if (gameState.isLookingRight && gameState.hasGun == true) {
            var x = gameState.gun.x + 10;
            var y = gameState.gun.y - 4;
        } else if (gameState.isLookingLeft && gameState.hasGun == true) {
            var x = gameState.gun.x - 12;
            var y = gameState.gun.y - 2;
        } else if (gameState.spaceshipActive == true) {
            var x = gameState.spaceship.x + 55
            var y = gameState.spaceship.y + 10
        }

        super(scene, x, y, "proj_bullet");
        gameState.projectiles.add(this)
        scene.add.existing(this);
        this.play("player_shoot_gun");
        scene.physics.world.enableBody(this)
        this.body.allowGravity = false;
        this.damage = 5;
        if(gameState.hasGun == true || gameState.spaceshipActive == true){
        scene.sound.play("gunshot")
        }

        scene.physics.add.collider(this, gameState.platforms, function (projectile, target) {
            projectile.destroy();
            var explosion = new Explosion(scene, projectile.x, projectile.y);
        }, null, scene);

        scene.physics.add.collider(this, gameState.enemies, function (projectile, target) {
            projectile.destroy();
            target.destroy();
            var explosion = new Explosion(scene, projectile.x, projectile.y).setScale(1.5);
        }, null, scene);

        if (gameState.level5Active == true) {
            scene.physics.add.collider(this, gameState.minotaur, function () {
                this.destroy();
                gameState.minotaur.health -= this.damage
                var percent = gameState.minotaur.health / 100;
                if(gameState.minotaur.health >= 0){
                gameState.healthBar.displayWidth = 300 * percent
                }
            }, null, this);
        }
        if(gameState.level5Active == true){
            scene.physics.add.collider(this, gameState.enemyProjectiles, function (projectile, target) {
                projectile.destroy();
                target.destroy();
                }, null, scene);
        }
    }

    update() {
        if (gameState.spaceshipActive == false) {
            if ((gameState.width - gameState.player.x) < ((config.width / 2)) - 16) {
                if ((this.x < ((gameState.width - config.width) + 16)) || (this.x > (gameState.width - 16))) {
                    this.destroy();
                }
            } else if (gameState.player.x < ((config.width / 2 - 16))) {
                if ((this.x < 16) || (this.x > config.width - 16)) {
                    this.destroy();
                }
            } else if (((gameState.player.x - this.x) > ((config.width / 2) - 16)) || ((this.x - gameState.player.x) > ((config.width / 2) - 16))) {
                this.destroy();
            }
        } else if (gameState.spaceshipActive == true) {
            if ((gameState.width - gameState.spaceship.x) < ((config.width / 2)) - 16) {
                if ((this.x < ((gameState.width - config.width) + 16)) || (this.x > (gameState.width - 16))) {
                    this.destroy();
                }
            } else if (gameState.spaceship.x < ((config.width / 2 - 16))) {
                if ((this.x < 16) || (this.x > config.width - 16)) {
                    this.destroy();
                }
            } else if (((gameState.spaceship.x - this.x) > ((config.width / 2) - 16)) || ((this.x - gameState.spaceship.x) > ((config.width / 2) - 16))) {
                this.destroy();
            }
        }
    }
}