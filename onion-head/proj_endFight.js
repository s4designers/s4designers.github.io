class MinotaurProjectile extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        var x = gameState.minotaur.x;
        var y = gameState.minotaur.y;
    
        super(scene, x, y, "ter_snowball");
        gameState.enemyProjectiles.add(this)
        scene.add.existing(this);        
        scene.physics.world.enableBody(this);
        
        this.setSize(this.width, this.height, true);
        this.body.setCircle(150);

        gameState.fireballCollider = scene.physics.add.overlap(this, gameState.player, function(projectile, player){
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