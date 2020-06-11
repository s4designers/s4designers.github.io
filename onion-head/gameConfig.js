const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "b9eaff",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
         //   debug: true,
        }
    },
    scene: [BootGame, MainMenu, ControlsScene, QuitGameScene, IntroScene, StartLevel, Level1, Level2, Level3, Level4, Level5, EndScene, GameOverScene]
};

const gameState = {
    width: 4000,
    height: 600
}

const game = new Phaser.Game(config);