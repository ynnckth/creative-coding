import p5 from "p5";

class Bird {
  private static readonly X_POSITION = 64;
  private static readonly SIZE = 12;
  private static readonly GRAVITY = 0.8;
  private static readonly LIFT = -12;

  private readonly _x: number;
  private _y: number;
  private readonly _size: number;
  private _alive = true;

  private readonly gravity: number;
  private readonly lift: number;
  private velocity: number;

  constructor(private p: p5) {
    this._x = Bird.X_POSITION;
    this._y = p.height / 2;
    this._size = Bird.SIZE;

    this.gravity = Bird.GRAVITY;
    this.lift = Bird.LIFT;
    this.velocity = 0;
  }

  show() {
    if (!this._alive) {
      return;
    }
    this.p.fill(255, 100);
    this.p.stroke(255);
    this.p.ellipse(this._x, this._y, this._size * 2, this._size * 2);
  }

  jump() {
    this.velocity += this.lift;
  }

  update() {
    if (this.isOffScreen()) {
      this._alive = false;
    }
    if (this._alive) {
      this.velocity += this.gravity;
      this._y += this.velocity;
    }
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

  get size(): number {
    return this._size;
  }

  get alive(): boolean {
    return this._alive;
  }

  set y(value: number) {
    this._y = value;
  }
}
export default Bird;
