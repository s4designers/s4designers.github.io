class EnemyMinotaur extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "obj_enemy_minotaur");

        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(this, gameState.grass);
        this.health = 100
        

        scene.physics.add.collider(this, gameState.platforms)

        

       //  adjusting collision boundaries after 1 second
        scene.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: scene,
            loop: true,
        });

        function delayDone() {
            gameState.minotaur.setSize(gameState.minotaur.width, gameState.minotaur.height, true);
        }
        
    }

}