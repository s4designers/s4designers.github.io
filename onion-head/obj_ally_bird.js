class Bird extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "obj_ally_bird")

        gameState.allies.add(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;

        scene.physics.add.collider(this, gameState.bullet, function (target, projectile) {
            target.destroy();
            projectile.destroy();
            var explosion = new Explosion(scene, projectile.x, projectile.y).setScale(1.5);
        }, null, scene);

    }

}