import p5 from "p5";

class Track {
  private static readonly WIDTH = 100;
  private static readonly NOISE_INCREMENT = 0.005;

  private xHistory: number[] = [];
  private yHistory: number[] = [];
  private y = 0;
  private noiseOffset = 0;

  constructor(private p: p5) {
    this.xHistory.push(this.p.width / 2);
  }

  show() {
    this.p.fill(0);
    for (let i = this.xHistory.length-1; i >= 0; i--) {
      // Left track boundary
      this.p.beginShape();
      this.p.vertex(this.xHistory[this.xHistory.length - i], this.yHistory[i]);
      this.p.vertex(this.xHistory[this.xHistory.length - i -1], this.yHistory[i -1]);
      this.p.endShape(this.p.CLOSE);

      // Right track boundary
      this.p.beginShape();
      this.p.vertex(this.xHistory[this.xHistory.length - i] + Track.WIDTH, this.yHistory[i]);
      this.p.vertex(this.xHistory[this.xHistory.length - i -1] + Track.WIDTH, this.yHistory[i -1]);
      this.p.endShape(this.p.CLOSE);
    }

  }

  update() {
    this.noiseOffset += Track.NOISE_INCREMENT;
    const nextNoiseValue = this.p.noise(this.noiseOffset);
    const nextX = this.p.map(nextNoiseValue, 0, 1, this.p.width / 2 - this.p.width/4, this.p.width / 2 + this.p.width/4);
    this.xHistory.push(nextX);
    this.yHistory.push(this.y);
    this.y++;
  }
}
export default Track;
