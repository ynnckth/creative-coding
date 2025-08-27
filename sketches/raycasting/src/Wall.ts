import p5 from "p5";

class Wall {
  private readonly _a: p5.Vector;
  private readonly _b: p5.Vector;

  constructor(private p: p5, x1: number, y1: number, x2: number, y2: number) {
    this._a = p.createVector(x1, y1);
    this._b = p.createVector(x2, y2);
  }

  show() {
    this.p.stroke(255, 75);
    this.p.line(this._a.x, this._a.y, this._b.x, this._b.y);
  }

  get a(): p5.Vector {
    return this._a;
  }

  get b(): p5.Vector {
    return this._b;
  }
}
export default Wall;