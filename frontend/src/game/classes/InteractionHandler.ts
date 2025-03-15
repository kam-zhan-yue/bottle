import Interaction from "./Interaction";

export default class InteractionHandler {
  private scene: Phaser.Scene;
  private interactions: Interaction[];
  private currentInteraction: Interaction | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.interactions = [];
    this.currentInteraction = null;
  }

  add(interaction: Interaction) {
    this.interactions.push(interaction);
  }

  update(playerPos: Phaser.Math.Vector2) {
    this.interactions.forEach((interaction) => {
      if (interaction.containsPoint(playerPos.x, playerPos.y)) {
        this.currentInteraction = interaction;
      }
    });
  }
}
