class Gun extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {

        if (gameState.level5Active == true) {
            var x = 150
        } else if (gameState.level2Active == true){
            var x = Phaser.Math.Between(600, 1050)
        } else {
            var x = Phaser.Math.Between(450, 500);
        }

        var y = Phaser.Math.Between(0, 5);

        super(scene, x, y, "weap_gun");
        gameState.weapons.add(this)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setBounce(0.4);

        scene.physics.add.collider(this, gameState.platforms);

        scene.physics.add.overlap(this, gameState.player, function (gun, target) {
            gameState.hasGun = true;
            gun.x = target.x + 16
            gun.y = target.y + 16
            gameState.gun.body.allowGravity = false;
        }, null, scene);

        scene.physics.add.overlap(this, gameState.lethalSurfaces, function () {
            gameState.gun.destroy();
            gameState.gunActive = false;

            if (gameState.gunActive == false) {
                this.time.addEvent({
                    delay: 5000,
                    callback: this.createGun,
                    callbackScope: this,
                    loop: false,
                });
            }
        }, null, scene)

    }
}