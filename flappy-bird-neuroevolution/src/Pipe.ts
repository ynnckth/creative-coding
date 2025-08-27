import p5 from "p5";
import Bird from "./Bird.ts";

/**
 * A pipe obstacle consisting of a top and bottom element with a gap in between
 */
class Pipe {
  private static readonly SPACING = 100;
  private static readonly WIDTH = 80;
  private static readonly SPEED = 6;

  private readonly _top: number;
  private readonly _bottom: number;

  private _x: number;

  constructor(private p: p5) {
    let centerOfEmptySpace = p.random(Pipe.SPACING, p.height - Pipe.SPACING);
    this._top = centerOfEmptySpace - Pipe.SPACING / 2;
    this._bottom = p.height - (centerOfEmptySpace + Pipe.SPACING / 2);
    // Starts at the right edge
    this._x = p.width;
  }

  hit(bird: Bird) {
    if (bird.y - Bird.SIZE < this._top || bird.y + Bird.SIZE > this.p.height - this._bottom) {
      if (bird.x > this._x && bird.x < this._x + Pipe.WIDTH) {
        return true;
      }
    }
    return false;
  }

  show() {
    this.p.stroke(100);
    this.p.fill(175);
    this.p.rect(this._x, 0, Pipe.WIDTH, this._top);
    this.p.rect(this._x, this.p.height - this._bottom, Pipe.WIDTH, this._bottom);
  }

  update() {
    this._x -= Pipe.SPEED;
  }

  isOffScreen() {
    return this._x < -Pipe.WIDTH;
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
