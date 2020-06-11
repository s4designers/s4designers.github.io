class QuitGameScene extends Phaser.Scene {
    constructor(){
        super("QuitGameScene")
    }

    create(){
        var endSprite = this.add.sprite(config.width * 0.5, config.height * 0.5, "obj_player_man").setScale(5)
        endSprite.anims.play("move_player_idle", true)

        var endText = this.add.text((config.width * 0.5), (config.height * 0.2),
            "DOEI", {
            fontSize: "64px",
            fill: "#000",
        }).setOrigin(0.5)
    }
}