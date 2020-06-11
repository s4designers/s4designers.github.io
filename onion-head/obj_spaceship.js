class Spaceship extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, "obj_spaceship");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);

        scene.physics.add.overlap(this, gameState.platforms, function () {
            gameState.spaceshipOnPlatform = true
        }, null, scene);
        scene.physics.add.collider(this, gameState.platforms)
        gameState.spaceshipOverlap = scene.physics.add.overlap(this, gameState.enemies, scene.hitByEnemy, null, scene);
        scene.physics.add.overlap(this, gameState.stars, function(player, star){
            star.destroy();
            gameState.score += 50;
        }, null, scene);

    }

    update() {

        if (gameState.cursors.up.isDown) {
            gameState.spaceship.body.velocity.y = -300;

        } else if (gameState.cursors.down.isDown) {
            gameState.spaceship.body.velocity.y = 300;

        } else {
            gameState.spaceship.setVelocityY(0);
        }

        if (gameState.spaceshipOnPlatform == true) {
            gameState.spaceshipTween.pause()
            gameState.spaceshipOnPlatform = false;

        } else if (gameState.spaceshipOnPlatform == false && gameState.spaceshipTween.isPaused()) {
            
            gameState.spaceshipTween.resume()
            
        }

    }
}
