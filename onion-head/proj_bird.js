class BirdProjectile extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        var x = gameState.shootingBird.x;
        var y = gameState.shootingBird.y;
    
        super(scene, x, y, "proj_bird_poop");
        gameState.enemyProjectiles.add(this)
        scene.add.existing(this);        
        scene.physics.world.enableBody(this);
        
        gameState.birbpoopCollider = scene.physics.add.overlap(this, gameState.player, function(projectile, player){
            projectile.destroy();
            scene.hitByEnemyProjectile();
        }, null, scene);
        scene.physics.add.collider(this, gameState.platforms, function (projectile, target) {
            projectile.destroy();
        }, null, scene);
    }

    update() {
        if (this.x > (gameState.width - 16) || this.x < 16) {
            this.destroy();
        }   
    }

}