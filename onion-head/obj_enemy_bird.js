class EnemyBird extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, speed) {

        var y = Phaser.Math.Between(20, 580)
        super(scene, x, y, "obj_ally_bird")

        gameState.enemies.add(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;

        scene.physics.add.collider(this, gameState.bullet, function (target, projectile) {
            target.destroy();
            projectile.destroy();
            var explosion = new Explosion(scene, projectile.x, projectile.y).setScale(1.5);
        }, null, scene);

        this.anims.play("move_bird_left")
        this.body.allowGravity = false

        gameState.enemyBirdTween = scene.tweens.add({
            targets: this,
            x: 100,
            ease: 'Linear',
            duration: speed,
            repeat: 0
        })
    }

    update(){
        if(this.x < 200){
            this.destroy()
        }
    }

}