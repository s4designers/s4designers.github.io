class Thwomp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "obj_thwomp")

        gameState.enemies.add(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);

        scene.physics.add.collider(this, gameState.platforms);
        this.anims.play("twhompAnimation")
    }
}