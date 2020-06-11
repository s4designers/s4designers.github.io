class Mushroom extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "poisonousMushroom")

        gameState.enemies.add(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);
        this.anims.play("poisonousMushroomEffect")
        this.body.allowGravity = false;

        scene.physics.add.collider(this, gameState.platforms);

        this.setSize(this.width, this.height, true);
    };
}
