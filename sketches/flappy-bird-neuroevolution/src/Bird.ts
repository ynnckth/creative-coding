import p5 from "p5";
import { NeuralNetwork } from "./lib/nn";
import Pipe from "./Pipe.ts";

class Bird {
  static readonly SIZE = 12;
  private static readonly X_POSITION = 64;
  private static readonly GRAVITY = 0.7;
  private static readonly LIFT = -16;

  private static readonly NO_INPUT_NODES = 5; // y position, y velocity, x location of closest pipe, y location of top pipe, y location of bottom pipe
  private static readonly NO_HIDDEN_NODES = 8; // Arbitrarily chosen
  private static readonly NO_OUTPUT_NODES = 1; // Single output for flap decision (> 0.5 -> flap)
  private static readonly MUTATION_RATE = 0.1;

  private readonly _x: number;

  private _y: number;
  private velocity: number;
  private _score = 0;
  // Normalized score between 0 and 1 representing probability to get picked for the next generation
  private _fitness = 0;

  private readonly _brain: NeuralNetwork;

  constructor(
    private p: p5,
    brain?: NeuralNetwork,
  ) {
    this._x = Bird.X_POSITION;
    this._y = p.height / 2;

    this.velocity = 0;

    if (brain) {
      this._brain = brain.copy();
    } else {
      this._brain = new NeuralNetwork(Bird.NO_INPUT_NODES, Bird.NO_HIDDEN_NODES, Bird.NO_OUTPUT_NODES);
    }
  }

  show() {
    this.p.fill(255, 150);
    this.p.stroke(175);
    this.p.ellipse(this._x, this._y, Bird.SIZE * 2, Bird.SIZE * 2);
  }

  update() {
    this._score++;
    this.velocity += Bird.GRAVITY;
    this._y += this.velocity;
  }

  /**
   * Decide whether to flap or not based on the neural network's output
   */
  process(pipes: Pipe[]) {
    const closestPipe = this.findClosestPipe(pipes);

    // Normalized inputs for the neural network
    const inputs = [];
    inputs[0] = this.y / this.p.height;
    inputs[1] = this.velocity / 10;
    inputs[2] = closestPipe.top / this.p.height;
    inputs[3] = closestPipe.bottom / this.p.height;
    inputs[4] = closestPipe.x / this.p.width;

    const output = this._brain.predict(inputs);
    if (output[0] > 0.5) {
      this.flap();
    }
  }

  /**
   * Mutate the bird's brain using random Gaussian distribution around 0
   */
  mutate() {
    this._brain.mutate(Bird.MUTATION_RATE, this.p);
  }

  /**
   * True when the bird has flown off the screen (hit the ground or flown too high)
   */
  isOffScreen(): boolean {
    return this._y > this.p.height || this._y < 0;
  }

  private flap() {
    this.velocity += Bird.LIFT;
  }

  private findClosestPipe(pipes: Pipe[]) {
    let closestPipe = pipes[0];
    let closestPipeDistance = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let distance = pipes[i].x + Pipe.WIDTH - this.x;
      if (distance < closestPipeDistance && distance > 0) {
        closestPipeDistance = distance;
        closestPipe = pipes[i];
      }
    }
    return closestPipe;
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

  set fitness(value: number) {
    this._fitness = value;
  }

  get fitness(): number {
    return this._fitness;
  }

  get brain(): NeuralNetwork {
    return this._brain;
  }
}
export default Bird;
