class BootGame extends Phaser.Scene {
    constructor() {
        super("BootGame")
    }

    preload() {

        // load all images and sprites
        this.load.image("bg_daylight", "assets/daylight_800x600.png");
        this.load.image("bg_forrest", "assets/forrest_4000x600.png");
        this.load.image("bg_cave", "assets/bg_cave_4000x600.png");
        this.load.image("bg_daylight_4000x600", "assets/daylight_4000x600.png")
        this.load.image("bg_daylight_4000x2000", "assets/daylight_4000x2000.png")

        this.load.image("ter_grass_800x50", "assets/grass_800x50.png");
        this.load.image("ter_grass_200x50", "assets/grass_200x50.png");
        this.load.image("ter_grass_200x100", "assets/grass_200x100.png");
        this.load.image("ter_grass_200x200", "assets/grass_200x200.png");
        this.load.image("ter_water_200x30", "assets/water_200x30.png");
        this.load.image("ter_gravel_200x50", "assets/gravel_200x50.png");
        this.load.image("ter_gravel_200x400", "assets/gravel_200x400.png");
        this.load.image("ter_lava_200x50", "assets/ter_lava_200x50.png");
        this.load.image("ter_cloud", "assets/cloud1.png");
        this.load.image("ter_tree_pine1", "assets/pine_tree1.png");
        this.load.image("ter_tree_pine2", "assets/pine_tree2.png");
        this.load.image("ter_tree_oak1", "assets/oak_tree1.png");
        this.load.image("ter_tree_oak2", "assets/oak_tree2.png");
        this.load.image("ter_tree_oak3", "assets/brown_tree.png");
        this.load.image("ter_tree_blossom", "assets/blossom_tree.png");
        this.load.image("ter_bush", "assets/bush_200x183.png");
        this.load.image("ter_tree_dead", "assets/dead_tree.png");
        this.load.image("ter_snowflake", "assets/snowflake.png");
        this.load.image("ter_snowball", "assets/snowball.png");
        

        this.load.image("obj_star", "assets/star.png");
        this.load.image("obj_key", "assets/goldenKey.png");
        this.load.image("obj_ladder", "assets/ladder_60x320.png");
        this.load.image("obj_lives", "assets/heart.png");
        this.load.image("obj_cave_entrance", "assets/cave_entrance.png");
        this.load.image("obj_statusBar", "assets/statusBar_300x15.png");
        this.load.spritesheet("obj_fireBall", "assets/obj_fireBall.png",{
            frameWidth: 153,
            frameHeight: 154,
        });
        

        this.load.image("proj_bomb", "assets/bomb.png");
        this.load.image("proj_bird_poop", "assets/bird_poop.png");

        this.load.image("weap_gun", "assets/gun_15x9.png");
        this.load.image("weap_spear", "assets/speer.png")
        this.load.image("img_controls", "assets/controlsImage.png");
        this.load.image("img_backButton", "assets/backButton.png");
        this.load.image("img_house", "assets/house.png");
        this.load.image("img_title", "assets/title.png");
        this.load.image("img_woman_idle", "assets/woman_idle.png");
        this.load.image("img_man_idle", "assets/man_idle.png");
        this.load.image("img_playGame_button", "assets/playGame.png");
        this.load.image("img_control_button", "assets/controls.png");
        this.load.image("img_quitGame_button", "assets/quitGame.png");
        this.load.image("img_cage", "assets/cage.png")


        //text story
        this.load.image("img_text_minotaur1", "assets/text_minotaur1.png");
        this.load.image("img_text_man2", "assets/text_man2.png");
        this.load.image("img_text_minotaur3", "assets/text_minotaur3.png");
        this.load.image("img_text_man4", "assets/text_man4.png");
        this.load.image("img_text_endFight", "assets/text_endFight.png");

        this.load.spritesheet("obj_enemy_minotaur", "assets/enemyMinotaur.png", {
            frameWidth: 48,
            frameHeight: 64
        })
        this.load.spritesheet("obj_enemy_bat", "assets/bat.png", {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.spritesheet("obj_door", "assets/doors.png", {
            frameWidth: 51,
            frameHeight: 61,
        })
        this.load.spritesheet("obj_player_man", "assets/player_man.png", {
            frameWidth: 32,
            frameHeight: 42,
        })
        this.load.spritesheet("obj_player_back", "assets/player_back.png", {
            frameWidth: 32,
            frameHeight: 42,
        })
        this.load.spritesheet("obj_ally_bird", "assets/bird.png", {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet("obj_enemy_frog", "assets/frog.png", {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.spritesheet("proj_bullet", "assets/bullet.png", {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.spritesheet("proj_explosion", "assets/explosion.png", {
            frameWidth: 16,
            frameHeight: 16,
        })

        this.load.spritesheet("obj_ally_rat", "assets/rat.png", {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.image("img_spaceship_idle", "assets/spaceship_idle.png")

        this.load.spritesheet("obj_spaceship", "assets/ship/obj_ship.png", {
            frameWidth: 198,
            frameHeight: 103,
        })

        
        this.load.spritesheet("obj_mushroom", "assets/poisonousMushroom.png", {
            frameWidth:  50,
            frameHeight: 50,
        })

        this.load.image("ter_gravel_flipped_200x400", "assets/gravel_flipped_200x400.png")

        this.load.image("ter_mountain", "assets/mountain.png")
        this.load.image("ter_mountain_darktint", "assets/ter_mountain_darkgrey.png");
        
        this.load.spritesheet("obj_thwomp","assets/ThwompSpriteSheet.png",{
            frameWidth: 57,
            frameHeight: 66,
        })

        this.load.spritesheet("obj_mushroom", "assets/poisonousMushroom.png", {
            frameWidth:  50,
            frameHeight: 50,
        })

        this.load.image("img_flashlight", "assets/mask1.png");

        this.load.spritesheet("obj_torch","assets/torch_sheet.png",{
            frameWidth: 32,
            frameHeight: 32,
        })

        //sound
        this.load.audio("music", "assets/sound/soundtrack_optie_3.mp3")
        this.load.audio("explosion", "assets/sound/explosion.mp3")
        this.load.audio("gunshot", "assets/sound/gunshot.mp3")
        this.load.audio("storm", "assets/sound/Wind_effect.mp3")

    }

    create() {

        // initiate leve1
        this.scene.start("MainMenu");

        // create all anims
        this.anims.create({
            key: "move_minotaur_left",
            frames: this.anims.generateFrameNumbers("obj_enemy_minotaur", { start: 3, end: 5 }),
            frameRate: 9,
            repeat: -1
        })

        this.anims.create({
            key: "move_minotaur_right",
            frames: this.anims.generateFrameNumbers("obj_enemy_minotaur", { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: "move_bat",
            frames: this.anims.generateFrameNumbers("obj_enemy_bat", { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "move_player_left",
            frames: this.anims.generateFrameNumbers("obj_player_man", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "move_player_up",
            frames: this.anims.generateFrameNumbers("obj_player_back", { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "move_player_idle",
            frames: [{ key: "obj_player_man", frame: 4 }],
        })

        this.anims.create({
            key: "move_player_right",
            frames: this.anims.generateFrameNumbers("obj_player_man", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "player_looking_right",
            frames: [{ key: "obj_player_man", frame: 5 }],
        });

        this.anims.create({
            key: "player_looking_left",
            frames: [{ key: "obj_player_man", frame: 0 }],
        });

        this.anims.create({
            key: "player_shoot_gun",
            frames: this.anims.generateFrameNumbers("proj_bullet"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("proj_explosion"),
            frameRate: 20,
            hideOnComplete: true,
            repeat: 0
        });

        this.anims.create({
            key: "door_open",
            frames: [{ key: "obj_door", frame: 0 }],
            frameRate: 10,
        });

        this.anims.create({
            key: "door_closed",
            frames: [{ key: "obj_door", frame: 1 }],
            frameRate: 10,
        });

        this.anims.create({
            key: "move_bird_right",
            frames: this.anims.generateFrameNumbers("obj_ally_bird", { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "move_bird_left",
            frames: this.anims.generateFrameNumbers("obj_ally_bird", { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });


        this.anims.create({
            key: "move_frog_right",
            frames: this.anims.generateFrameNumbers("obj_enemy_frog", { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: "move_ally_rat",
            frames: this.anims.generateFrameNumbers("obj_ally_rat", { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "move_spaceship_right",
            frames: this.anims.generateFrameNumbers("obj_spaceship", {start: 0, end: 1}),
            frameRate: 40,
            repeat: -1
        })

        // //nieuw
        this.anims.create({
            key: "poisonousMushroomEffect",
            frames: this.anims.generateFrameNumbers("obj_mushroom", {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        })

        this.anims.create({
            key: 'twhompAnimation',
            frames: this.anims.generateFrameNumbers("obj_thwomp", {start: 0, end: 6}),
            frameRate: 6,
            repeat: -1
        })

        this.anims.create({
            key: 'torch_light',
            frames: this.anims.generateFrameNumbers("obj_torch", {start: 0, end: 5}),
            frameRate: 16,
            repeat: -1
        })

        this.anims.create({
            key: 'fireBall',
            frames: this.anims.generateFrameNumbers("obj_fireBall", {start: 0, end: 5}),
            frameRate: 16,
            repeat: -1
        })
    }
}

