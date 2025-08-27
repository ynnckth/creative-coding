import p5 from "p5";
import Ray from "./Ray.ts";
import type Wall from "./Wall.ts";

class Particle {
  private static readonly DEFAULT_FIELD_OF_VIEW = 45;

  private fieldOfView: number
  private pos: p5.Vector;
  private rays: Ray[];
  private heading: number;

  constructor(private p: p5, sceneW: number, sceneH: number) {
    this.fieldOfView = Particle.DEFAULT_FIELD_OF_VIEW;
    this.pos = p.createVector(sceneW / 2, sceneH / 2);
    this.rays = [];
    this.heading = 0;
    for (let a = -this.fieldOfView / 2; a < this.fieldOfView / 2; a += 1) {
      this.rays.push(new Ray(this.p, this.pos, p.radians(a)));
    }
  }

  updateFieldOfView(fieldOfView: number) {
    this.fieldOfView = fieldOfView;
    this.rays = [];
    for (let a = -this.fieldOfView / 2; a < this.fieldOfView / 2; a += 1) {
      this.rays.push(new Ray(this.p, this.pos, this.p.radians(a) + this.heading));
    }
  }

  rotate(angle: number) {
    this.heading += angle;
    let index = 0;
    for (let a = -this.fieldOfView / 2; a < this.fieldOfView / 2; a += 1) {
      this.rays[index].setAngle(this.p.radians(a) + this.heading);
      index++;
    }
  }

  move(amount: number) {
    const vel = p5.Vector.fromAngle(this.heading);
    vel.setMag(amount);
    this.pos.add(vel);
  }

  look(walls: Wall[]) {
    const scene = [];
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          const a = ray.dir.heading() - this.heading;
          d *= this.p.cos(a);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        this.p.stroke(255, 100);
        this.p.line(this.pos.x, this.pos.y, closest.x, closest.y);
        this.p.point(closest.x, closest.y)
      }
      scene[i] = record;
    }
    return scene;
  }

  show() {
    this.p.fill(255);
    this.p.ellipse(this.pos.x, this.pos.y, 4);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
export default Particle;