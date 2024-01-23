// FILEPATH: /Users/yudiz/Documents/Mini Games/Box-Jump/tests/Level.test.js
import Phaser from 'phaser';
import Level from '../src/scenes/Level.js';

describe('Level scene', () => {
    let scene;
    let game;

    beforeEach(() => {
        game = new Phaser.Game();
        scene = new Level();
        scene.events = { emit: jest.fn() }; // mock the events property
        scene.add = { 
            sprite: jest.fn().mockReturnValue({ 
                body: { setBounceY: jest.fn(), setGravityY: jest.fn(), setImmovable: jest.fn(), immovable: true  }, 
                setOrigin: jest.fn(),
                setScale: jest.fn()
            }), 
            text: jest.fn().mockReturnValue({ setOrigin: jest.fn() }), // mock the text method to return an object with a setOrigin method
            emitter: jest.fn(),
            group: jest.fn().mockReturnValue({ createMultiple: jest.fn(), getChildren: jest.fn().mockReturnValue(new Array(20)) }),
            particles: jest.fn().mockReturnValue({ createEmitter: jest.fn().mockReturnValue({}) }) // mock the createEmitter method to return an object
        };
        scene.game = { config: { height: 600 } };
        scene.physics = { world: { enable: jest.fn(), isPaused: false } }; // mock the physics property
        scene.sound = { add: jest.fn().mockReturnValue({}) }; // mock the add method to return an object
        scene.input = { keyboard: { addKey: jest.fn().mockReturnValue({}) } }; // mock the addKey method to return an object
        scene.loadLevel = jest.fn();
        
        game.scene.add('level', scene, true);
    });
    afterEach(() => {
        game.destroy();
    });


    test('should create player', () => {
        scene.create();
        expect(scene.player).toBeDefined();
        expect(scene.physics.world.isPaused).toBe(false);
    });

    test('should create cubes', () => {
        scene.create();
        expect(scene.cubes).toBeDefined();
        expect(scene.cubes.getChildren().length).toBe(20);
    });

    test('should create line', () => {
        scene.create();
        expect(scene.line).toBeDefined();
        expect(scene.line.body.immovable).toBe(true);
    });

    test('should create sounds', () => {
        scene.create();
        expect(scene.hitSound).toBeDefined();
        expect(scene.jumpSound).toBeDefined();
    });

    test('should create labels', () => {
        scene.create();
        expect(scene.labelDeath).toBeDefined();
        expect(scene.labelLevel).toBeDefined();
        expect(scene.labelTuto).toBeDefined();
    });

    test('should create input', () => {
        scene.create();
        expect(scene.spaceKey).toBeDefined();
    });

    test('should create emitter', () => {
        scene.create();
        expect(scene.emitter).toBeDefined();
    });

    test('should load level', () => {
        const loadLevelSpy = jest.spyOn(scene, 'loadLevel');
        scene.create();
        expect(loadLevelSpy).toHaveBeenCalled();
    });
});