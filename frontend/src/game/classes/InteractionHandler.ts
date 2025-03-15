import Interaction from "./Interaction";

export default class InteractionHandler {
  private interactions: Interaction[];

  constructor(scene: Phaser.Scene) {
    this.interactions = [];

    this.add(
      new Interaction(
        scene,
        "mailbox",
        new Phaser.Math.Vector2(-80, 10),
        new Phaser.Math.Vector2(50, 50),
        "mailbox",
      ),
    );

    this.add(
      new Interaction(
        scene,
        "note",
        new Phaser.Math.Vector2(80, 10),
        new Phaser.Math.Vector2(50, 50),
        "table",
        undefined,
        -10,
      ),
    );
  }

  add(interaction: Interaction) {
    this.interactions.push(interaction);
  }

  update(playerPos: Phaser.Math.Vector2) {
    this.interactions.forEach((interaction) => {
      interaction.update(playerPos);
    });
  }

  getCurrentInteraction(playerPos: Phaser.Math.Vector2): Interaction | null {
    for (const interaction of this.interactions) {
      if (interaction.containsPoint(playerPos.x, playerPos.y)) {
        return interaction;
      }
    }
    return null;
  }
}
