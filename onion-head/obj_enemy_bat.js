class EnemyBat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {

        if (gameState.level2Active == false) {
            var x = Phaser.Math.Between(0, 200)
            var y = Phaser.Math.Between(20, 100)
        } else if (gameState.level2Active == true) {
            var x = Phaser.Math.Between(2800, 3600)
            var y = Phaser.Math.Between(200, 250)
        }


        super(scene, x, y, "obj_enemy_bat")

        gameState.enemies.add(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);

        this.anims.play("move_bat")
        this.body.allowGravity = false

        if (gameState.level2Active == false) {
            var xTween = Phaser.Math.Between(600, 750)
        } else if (gameState.level2Active == true) {
            var xTween = Phaser.Math.Between(2800, 4000)

            gameState.batTween = scene.tweens.add({
                targets: this,
                x: xTween,
                ease: 'Linear',
                duration: 5000,
                flipX: true,
                repeat: -1,
                yoyo: true
            })
        }
    }
}