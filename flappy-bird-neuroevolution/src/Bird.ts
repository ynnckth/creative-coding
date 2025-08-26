import p5 from "p5";
import { NeuralNetwork } from "./lib/nn";
import type Pipe from "./Pipe.ts";

class Bird {
  static readonly SIZE = 12;
  private static readonly X_POSITION = 64;
  private static readonly GRAVITY = 0.7;
  private static readonly LIFT = -12;

  private static readonly NO_INPUT_NODES = 4; // y position, y velocity, x location of closest pipe, y location of top pipe, y location of bottom pipe
  private static readonly NO_HIDDEN_NODES = 8; // Arbitrarily chosen
  private static readonly NO_OUTPUT_NODES = 1; // Single output for flap decision

  private readonly _x: number;

  private _y: number;
  private _alive = true;
  private velocity: number;
  private _score = 0;

  private readonly brain: NeuralNetwork;

  constructor(private p: p5) {
    this._x = Bird.X_POSITION;
    this._y = p.height / 2;

    this.velocity = 0;

    this.brain = new NeuralNetwork(Bird.NO_INPUT_NODES, Bird.NO_HIDDEN_NODES, Bird.NO_OUTPUT_NODES);
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

  /**
   * Decide whether to flap or not based on the neural network's output
   */
  think(pipes: Pipe[]) {
    const closestPipe = this.findClosestPipe(pipes);

    let inputs = [];
    inputs[0] = this.y / this.p.height;
    inputs[1] = closestPipe.top;
    inputs[2] = closestPipe.bottom;
    inputs[3] = closestPipe.x;

    let output = this.brain.predict(inputs);
    if (output[0] > 0.5) {
      this.flap();
    }
  }

  private flap() {
    this.velocity += Bird.LIFT;
  }

  increaseScore() {
    this._score++;
  }

  die() {
    this._alive = false;
  }

  private findClosestPipe(pipes: Pipe[]) {
    let closestPipe = pipes[0];
    let closestPipeDistance = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let distance = pipes[i].x - this.x;
      if (distance < closestPipeDistance && distance > 0) {
        closestPipeDistance = distance;
        closestPipe = pipes[i];
      }
    }
    return closestPipe;
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
