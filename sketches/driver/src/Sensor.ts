import p5 from "p5";
import  Wall from "./Wall.ts";

class Sensor {
  private pos: p5.Vector;
  private angle: number;
  private _dir: p5.Vector;
  
  constructor(private p: p5, pos: p5.Vector, angle: number) {
    this.pos = pos;
    this._dir = p5.Vector.fromAngle(angle);
    this.angle = angle;
  }

  setAngle(angle: number) {
    this._dir = p5.Vector.fromAngle(angle);
  }

  rotate(offset: number) {
    this._dir = p5.Vector.fromAngle(this.angle + offset);
  }

  show() {
    this.p.stroke(255);
    this.p.push();
    this.p.translate(this.pos.x, this.pos.y);
    this.p.line(0, 0, this._dir.x * 10, this._dir.y * 10);
    this.p.pop();
  }

  cast(wall: Wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this._dir.x;
    const y4 = this.pos.y + this._dir.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator == 0) {
      return;
    }
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
    if (t > 0 && t < 1 && u > 0) {
      const pt = this.p.createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    }
  }

  get dir(): p5.Vector {
    return this._dir;
  }
}
export default Sensor;