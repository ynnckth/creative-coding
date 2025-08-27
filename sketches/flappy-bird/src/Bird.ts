import p5 from "p5";

class Bird {
  static readonly SIZE = 12;
  private static readonly X_POSITION = 64;
  private static readonly GRAVITY = 0.7;
  private static readonly LIFT = -12;

  private readonly _x: number;

  private _y: number;
  private _alive = true;
  private velocity: number;
  private _score = 0;

  constructor(private p: p5) {
    this._x = Bird.X_POSITION;
    this._y = p.height / 2;
    this.velocity = 0;
  }

  show() {
    if (!this._alive) {
      return;
    }
    this.p.fill(255);
    this.p.stroke(175);
    this.p.ellipse(this._x, this._y, Bird.SIZE * 2, Bird.SIZE * 2);
  }

  update() {
    if (this.isOffScreen()) {
      this._alive = false;
    }
    if (this._alive) {
      this.velocity += Bird.GRAVITY;
      this._y += this.velocity;
    }
  }

  flap() {
    this.velocity += Bird.LIFT;
  }

  increaseScore() {
    this._score++;
  }

  die() {
    this._alive = false;
  }

  private isOffScreen(): boolean {
    return this._y > this.p.height || this._y < 0;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get score(): number {
    return this._score;
  }

  get alive(): boolean {
    return this._alive;
  }
}
export default Bird;
