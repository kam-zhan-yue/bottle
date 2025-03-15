import Interaction from "./Interaction";

export default class InteractionHandler {
  private interactions: Interaction[];

  constructor() {
    this.interactions = [];
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
