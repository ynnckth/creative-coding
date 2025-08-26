import p5 from "p5";
import Bird from "./Bird.ts";

class Pipe {
  private static readonly SPACING = 125;

  private _top: number;
  private _bottom: number;
  private _x: number;
  private width: number;
  private speed: number;

  constructor(private p: p5) {
    let centerOfEmptySpace = p.random(Pipe.SPACING, p.height - Pipe.SPACING);
    this._top = centerOfEmptySpace - Pipe.SPACING / 2;
    this._bottom = p.height - (centerOfEmptySpace + Pipe.SPACING / 2);
    // Starts at the right edge
    this._x = p.width;
    this.width = 80;
    this.speed = 6;
  }

  hit(bird: Bird) {
    if (bird.y - bird.size < this._top || bird.y + bird.size > this.p.height - this._bottom) {
      if (bird.x > this._x && bird.x < this._x + this.width) {
        return true;
      }
    }
    return false;
  }

  show() {
    this.p.stroke(175);
    this.p.fill(175);
    this.p.rect(this._x, 0, this.width, this._top);
    this.p.rect(this._x, this.p.height - this._bottom, this.width, this._bottom);
  }

  update() {
    this._x -= this.speed;
  }

  offscreen() {
    return this._x < -this.width;
  }

  get x(): number {
    return this._x;
  }

  get top(): number {
    return this._top;
  }

  get bottom(): number {
    return this._bottom;
  }
}
export default Pipe;
