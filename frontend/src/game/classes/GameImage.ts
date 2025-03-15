export default class GameImage {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    depth: number | undefined = undefined,
  ) {
    const image = scene.add.image(x, y, key);
    if (depth) {
      image.depth = depth;
    } else {
      image.depth = image.y + image.height / 2;
      console.log(key, " ", image.depth);
    }
  }
}
