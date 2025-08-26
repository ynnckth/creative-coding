import p5 from "p5";

class Bird {
  private static readonly X_POSITION = 64;
  private static readonly SIZE = 12;
  private static readonly GRAVITY = 0.8;
  private static readonly LIFT = -12;

  private readonly _x: number;
  private _y: number;
  private readonly _size: number;

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
    this.p.fill(255, 100);
    this.p.stroke(255);
    this.p.ellipse(this._x, this._y, this._size * 2, this._size * 2);
  }

  jump() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this._y += this.velocity;

    if (this.y > this.p.height) {
      this.y = this.p.height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
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

  set y(value: number) {
    this._y = value;
  }
}
export default Bird;
