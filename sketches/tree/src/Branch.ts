import p5 from "p5";

class Branch {

  constructor(private p: p5, private startpos: p5.Vector, private endpos: p5.Vector, private weight: number, private color: any, private _recursionDepth: number) {
  }

  display() {
    this.p.strokeWeight(this.weight);
    this.p.stroke(this.color);
    this.p.line(this.startpos.x, this.startpos.y, this.endpos.x, this.endpos.y);
  }

  get recursionDepth(): number {
    return this._recursionDepth;
  }
}
export default Branch;