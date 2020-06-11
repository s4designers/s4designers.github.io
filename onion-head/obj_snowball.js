class Snowball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "ter_snowball")

        gameState.enemies.add(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);

        scene.physics.add.collider(this, gameState.platforms);

        this.setSize(this.width, this.height, true);
        this.body.setCircle(150)

        scene.tweens.add({
            targets: this,
            x: 10,
            ease: 'Linear',
            duration: 30000,
        }, null, scene)
    };

    update(){
        if (this.x <= 10){
            this.destroy();
        }
    }
}