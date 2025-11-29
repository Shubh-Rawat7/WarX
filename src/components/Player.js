export default class Player {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.health = 100;
    this.image = img;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
