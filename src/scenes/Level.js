import Phaser from 'phaser';

// You can write more code here
var map = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],

	[0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 5, 5, 5, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 3],
	[0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0],

	[0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2],
	[0, 0, 5, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
	[0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 2, 2, 2, 0, 0, 5],
	[0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 5, 5, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 2],

	[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
	[0, 0, 0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 3, 3, 0, 0, 0, 0, 5, 0, 0],
	[0, 0, 0, 0, 0, 5, 0, 0, 2, 2, 0, 0, 0, 0, 5, 5, 0, 0, 0, 4, 0, 0],
	[0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 4, 1],
	[0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 2, 0, 0]
];

var w = 1920;
var h = 1080;
var DEATH = 0;
/* START OF COMPILED CODE */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();

		this.player = this.add.sprite(80, this.game.config.height * 2 / 3 - 20, 'player');
		this.physics.world.enable(this.player);
		this.player.body.setBounceY(0);
		this.player.body.setGravityY(10000);
		this.player.setOrigin(0.5, 0.5);

		// cube
		this.cubes = this.add.group();
		this.cubes.createMultiple({
			key: 'cube',
			repeat: 19,
			setXY: { x: 0, y: 0, stepX: 40 } // Set the x and y position of each cube
		});

		// line
		this.line = this.add.sprite(this.game.config.width / 2, Math.floor(this.game.config.height * 2 / 3), 'line');
		this.line.setOrigin(0.5, 0.5);
		this.physics.world.enable(this.line);
		this.line.body.setImmovable(true);
		this.line.setScale(5);

		// sound
		this.hitSound = this.sound.add('hit');
		this.jumpSound = this.sound.add('jump');

		// death label
		this.labelDeath = this.add.text(100, this.game.config.height - 35, '0', {
			font: '18px Arial',
			fill: '#fff',
			align: 'center'
		});
		this.labelDeath.setOrigin(0.5, 0.5);

		// level label
		this.labelLevel = this.add.text(this.game.config.width - 100 + 0.5, this.game.config.height - 35, '1/' + map.length, {
			font: '18px Arial',
			fill: '#fff',
			align: 'center'
		});
		this.labelLevel.setOrigin(0.5, 0.5);

		// intro label
		this.labelTuto = this.add.text(Math.floor(this.game.config.width / 2) + 0.5, this.game.config.height - 35 + 0.5, 'press space to jump', {
			font: '18px Arial',
			fill: '#fff',
			align: 'center'
		});
		this.labelTuto.setOrigin(0.5, 0.5);

		// input
		this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		// var
		this.level = 0;
		this.isStarted = false;

		// emitter
		this.emitter = this.add.particles('pixel').createEmitter({
			x: 0,
			y: 0,
			speed: { min: -200, max: 200 },
			gravityY: 0,
			lifespan: 300,
			quantity: 8
		});

		// load level
		this.loadLevel();
	}

	playerJump() {
		this.player.body.setVelocityY(-250);

		this.jumpSound.play('', { volume: 0.1 });

		// spin the player
		this.tweens.add({
			targets: this.player,
			angle: this.player.angle + 180,
			duration: 700,
			ease: 'Linear'
		});
	}

	drawLevel(map) {

		this.cubes.children.entries.forEach((cube) => {
			// cube.disableBody(true, true);
			this.physics.world.enable(cube); // Add this line to enable physics on the cube

		});

		this.cubes.children.entries.forEach((cube) => {
			cube.body.enable = false;
			// this.physics.world.enable(cube); // Add this line to enable physics on the cube

		});
		console.log(map)
		var cube;
		var height;
		for (var i = 0; i < map.length; i++) {
			cube = this.cubes.getFirstDead(true, 500 + i * this.cubes.children.entries[0].width * 10, this.game.config.height * 2 / 3);
			this.physics.world.enable(cube);

			if (map[i] == 1) {
				height = 0.3;
			} else if (map[i] == 2) {
				height = 1;
			} else if (map[i] == 3) {
				height = 1.5;
			} else if (map[i] == 4) {
				height = 1.8;
			} else if (map[i] == 5) {
				cube.y -= 22;
				height = 0.5;
			}

			if (map[i] != 0) {
				cube.setScale(1, 0);
				cube.setOrigin(0, 1);

				// animate when init cube
				this.tweens.add({
					targets: cube.scale,
					y: height,
					duration: 1000 * height,
					ease: 'Linear'
				});
			}
		}
	}

	initPlayer() {
		this.player.body.setGravityY(0);
		this.player.x = 60;
		this.player.y = this.game.config.height * 2 / 3 - this.player.height / 2 - 30;
		this.player.body.setVelocity(0, 0);
		this.player.angle = 0;

		if (this.rotation) {
			this.rotation.pause();
		}
	}

	loadLevel() {
		if (map.length == this.level) {
			this.scene.start('End');

		} else {
			this.drawLevel(map[this.level]);
			this.level++;
			this.labelLevel.setText(this.level + '/' + map.length);
			this.initPlayer();

			if (this.level == 2) {
				this.labelTuto.setText('');
			}
		}
	}

	playerHit(player, hit) {
		if (this.player.active) {
			this.hitSound.play('', { volume: 0.2 });

			this.player.active = false;
			DEATH += 1;

			this.emitter.setPosition(player.x + player.width / 2, player.y + player.height / 2);
			this.emitter.start();

			this.labelDeath.setText(DEATH);
			this.initPlayer();
		}
	}

	update() {
		this.physics.world.collide(this.player, this.line);

		// on the ground && press space
		if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && this.player.body.touching.down) {
			this.playerJump();

			if (!this.isStarted) {
				this.isStarted = true;
				this.player.body.setVelocityX(170);
				this.sound.add('music').play('', { volume: 0.1, loop: true });
			}
		}
		if (this.player.body.touching.down && this.isStarted) {
			this.player.active = true;
			this.player.body.setVelocityX(170);
		}

		if (this.player.x >= this.game.config.width - 60)
			this.loadLevel();
		this.emitter.forEachAlive(function (particle) {
			particle.alpha = Phaser.Math.Clamp(particle.lifespan / 100, 0, 1);
		}, this);

		this.player.body.setGravityY(800);

		if (this.player.y > this.line.y) {
			this.initPlayer();
		}

		this.physics.world.overlap(this.player, this.cubes, this.playerHit, null, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
