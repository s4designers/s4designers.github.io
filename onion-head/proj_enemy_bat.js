class EnemyBatProjectile extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        var x = gameState.shootingBat.x;
        var y = gameState.shootingBat.y;
    
        super(scene, x, y, "proj_bomb");
        gameState.enemyProjectiles.add(this)
        scene.add.existing(this);        
        scene.physics.world.enableBody(this)
        this.body.allowGravity = false;  

        gameState.bombCollider = scene.physics.add.overlap(this, gameState.player, function(projectile, player){
            projectile.destroy();
            var explosion = new Explosion(scene, projectile.x, projectile.y).setScale(2);
            scene.hitByEnemyProjectile();
        }, null, scene);
        scene.physics.add.collider(this, gameState.platforms, function (projectile, target) {
            projectile.destroy();
            var explosion = new Explosion(scene, projectile.x, projectile.y).setScale(2);
        }, null, scene);

    }

    update() {
        if (this.x > (gameState.width - 16) || this.x < 16) {
            this.destroy();
        } 
    
    }

}
