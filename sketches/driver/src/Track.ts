import p5 from "p5";
import Wall from "./Wall.ts";

class Track {
  private static readonly WIDTH = 100;
  private static readonly NOISE_INCREMENT = 0.005;
  private static readonly STEP = 2; // vertical spacing per frame (px)

  // Number of points to cover the screen plus a small buffer
  private readonly numInitialSegments;

  private xHistory: number[] = [];
  private yHistory: number[] = [];
  private leftWalls: Wall[] = [];
  private rightWalls: Wall[] = [];

  private y = 0;
  private noiseOffset = 0;

  constructor(private p: p5) {
    const centerX = this.p.width / 2 - Track.WIDTH / 2;
    this.noiseOffset = centerX - Track.WIDTH;

    this.numInitialSegments = Math.ceil(this.p.height / Track.STEP) + 10;

    for (let i = this.numInitialSegments - 1; i >= 0; i--) {
      const y = i * Track.STEP; // y grows downward: i=0 -> head at y=0
      this.xHistory.push(centerX);
      this.yHistory.push(y);

      const len = this.xHistory.length;
      if (len >= 2) {
        const x1 = this.xHistory[len - 1];
        const y1 = this.yHistory[len - 1];
        const x2 = this.xHistory[len - 2];
        const y2 = this.yHistory[len - 2];

        this.leftWalls.push(new Wall(this.p, x1, y1, x2, y2));
        this.rightWalls.push(new Wall(this.p, x1 + Track.WIDTH, y1, x2 + Track.WIDTH, y2));
      }
    }
    // Make sure the current head y matches the newest point (y=0)
    this.y = this.yHistory[this.yHistory.length - 1];
    this.p.noiseSeed(this.noiseOffset);
  }

  show() {
    this.p.push();
    this.p.translate(0, -this.y);
    for(let i = 0; i < this.leftWalls.length; i++) {
      this.leftWalls[i].show();
      this.rightWalls[i].show();
    }
    this.p.pop();
  }

  update() {
    const nextNoiseValue = this.p.noise(this.noiseOffset);
    const nextX = this.p.map(
      nextNoiseValue,
      0, 1,
      this.p.width / 2 - this.p.width / 4,
      this.p.width / 2 + this.p.width / 4
    );
    this.noiseOffset += Track.NOISE_INCREMENT;
    this.y -= Track.STEP;

    this.xHistory.push(nextX);
    this.yHistory.push(this.y);

    const len = this.xHistory.length;
    if (len >= 2) {
      const x1 = this.xHistory[len - 1];
      const y1 = this.yHistory[len - 1];
      const x2 = this.xHistory[len - 2];
      const y2 = this.yHistory[len - 2];

      this.leftWalls.push(new Wall(this.p, x1, y1, x2, y2));
      this.rightWalls.push(new Wall(this.p, x1 + Track.WIDTH, y1, x2 + Track.WIDTH, y2));
    }
    const maxSegments = Math.ceil(this.p.height / Track.STEP) + 10;
    while (this.leftWalls.length > maxSegments) {
      this.leftWalls.shift();
      this.rightWalls.shift();
      this.xHistory.shift();
      this.yHistory.shift();
    }
  }

  getWalls(): Wall[] {
    return [...this.leftWalls, ...this.rightWalls];
  }
}
export default Track;