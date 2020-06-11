class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){

        super(scene, x, y, "proj_explosion");
        scene.add.existing(this);
        this.play("explode");
        scene.sound.play("explosion")
    }
}