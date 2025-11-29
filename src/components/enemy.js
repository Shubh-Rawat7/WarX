export default class Enemy {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speed = 1.5;
    this.image = img;
    this.damage = 1;
  }

  update(player) {
    if (this.x > player.x) this.x -= this.speed;
    if (this.y > player.y) this.y -= this.speed;
    if (this.x < player.x) this.x += this.speed;
    if (this.y < player.y) this.y += this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
