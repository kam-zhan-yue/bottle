import Obstacle from "./Obstacle";
import Player from "./Player";

export default class ObstacleHandler {
  private scene: Phaser.Scene;
  private obstacles: Obstacle[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    // Bottom Wall
    this.obstacles.push(
      new Obstacle(
        this.scene,
        new Phaser.Math.Vector2(0, 70),
        new Phaser.Math.Vector2(500, 19),
      ),
    );

    // Top Wall
    this.obstacles.push(
      new Obstacle(
        this.scene,
        new Phaser.Math.Vector2(0, -83),
        new Phaser.Math.Vector2(500, 10),
      ),
    );

    // Right Wall
    this.obstacles.push(
      new Obstacle(
        this.scene,
        new Phaser.Math.Vector2(105, 0),
        new Phaser.Math.Vector2(10, 500),
      ),
    );

    // Left Wall
    this.obstacles.push(
      new Obstacle(
        this.scene,
        new Phaser.Math.Vector2(-105, 0),
        new Phaser.Math.Vector2(10, 500),
      ),
    );

    // Top Left Corner
    this.obstacles.push(
      new Obstacle(
        this.scene,
        new Phaser.Math.Vector2(-95, -65),
        new Phaser.Math.Vector2(30, 30),
      ),
    );

    // Top Right Corner
    this.obstacles.push(
      new Obstacle(
        this.scene,
        new Phaser.Math.Vector2(95, -65),
        new Phaser.Math.Vector2(30, 30),
      ),
    );

    // Bottom Left Corner
    this.obstacles.push(
      new Obstacle(
        this.scene,
        new Phaser.Math.Vector2(-95, 50),
        new Phaser.Math.Vector2(30, 30),
      ),
    );

    // Bottom Right Corner
    this.obstacles.push(
      new Obstacle(
        this.scene,
        new Phaser.Math.Vector2(95, 50),
        new Phaser.Math.Vector2(30, 30),
      ),
    );

    // Table
    this.obstacles.push(
      new Obstacle(
        this.scene,
        new Phaser.Math.Vector2(80, 10),
        new Phaser.Math.Vector2(40, 20),
      ),
    );
  }

  init(player: Player) {
    for (const obstacle of this.obstacles) {
      this.scene.physics.add.collider(player.body, obstacle.body);
    }
  }
}
