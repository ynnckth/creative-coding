import p5 from "p5";

class Bird {
  private readonly _x: number;
  private _y: number;
  private readonly _size: number;

  private readonly gravity: number;
  private readonly lift: number;
  private velocity: number;

  /**
   * How many frames it's been alive
   */
  private _score: number;

  /**
   * Normalized version of score
   */
  private _fitness: number;

  constructor(private p: p5) {
    this._x = 64;
    this._y = p.height / 2;
    this._size = 12;

    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;

    this._score = 0;
    this._fitness = 0;
  }

  show() {
    this.p.fill(255, 100);
    this.p.stroke(255);
    this.p.ellipse(this._x, this._y, this._size * 2, this._size * 2);
  }

  // This is the key function now that decides
  // if it should jump or not jump!
  // think(pipes: Pipe[]) {
  //   // First find the closest pipe
  //   let closestPipe = null;
  //   let record = Infinity;
  //   for (let i = 0; i < pipes.length; i++) {
  //     let diff = pipes[i].x - this.x;
  //     if (diff > 0 && diff < record) {
  //       record = diff;
  //       closestPipe = pipes[i];
  //     }
  //   }
  //
  //   if (closestPipe != null) {
  //     let inputs = [];
  //     // x position of closest pipe
  //     inputs[0] = this.p.map(closestPipe.x, this.x, this.p.width, 0, 1);
  //     // top of closest pipe opening
  //     inputs[1] = this.p.map(closestPipe.top, 0, this.p.height, 0, 1);
  //     // bottom of closest pipe opening
  //     inputs[2] = this.p.map(closestPipe.bottom, 0, this.p.height, 0, 1);
  //     // bird's y position
  //     inputs[3] = this.p.map(this._y, 0, this.p.height, 0, 1);
  //     // bird's y velocity
  //     inputs[4] = this.p.map(this.velocity, -5, 5, 0, 1);
  //
  //     // Get the outputs from the network
  //     let action = this.brain.predict(inputs);
  //     // Decide to jump or not!
  //     if (action[1] > action[0]) {
  //       this.jump();
  //     }
  //   }
  // }

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

    this._score++;
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

  get score(): number {
    return this._score;
  }

  get fitness(): number {
    return this._fitness;
  }

  set score(value: number) {
    this._score = value;
  }

  set fitness(value: number) {
    this._fitness = value;
  }

  set y(value: number) {
    this._y = value;
  }
}
export default Bird;
