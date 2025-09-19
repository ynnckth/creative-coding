import p5 from "p5";
import Sensor from "./Sensor.ts";
import type Wall from "./Wall.ts";

class Vehicle {
  private static readonly WIDTH = 35;
  private static readonly LENGTH = 50;

  private position: p5.Vector;
  private score = 0;
  private sensors: Sensor[] = [];

  constructor(private p: p5) {
    this.position = p.createVector(p.width / 2, p.height - 60);

    for (let a = -45; a < 45; a += 15) {
      this.sensors.push(new Sensor(this.p, this.position, p.radians(a)));
    }

    for (let sensor of this.sensors) {
      sensor.rotate(this.p.radians(-90));
    }
  }

  show() {
    this.p.fill(255);
    this.p.rect(this.position.x - Vehicle.WIDTH/2, this.p.height - 60, Vehicle.WIDTH, Vehicle.LENGTH);

    for (let sensor of this.sensors) {
      sensor.show();
    }
  }

  update() {
    this.score++;
  }

  look(walls: Wall[]) {
    const scene = [];
    for (let i = 0; i < this.sensors.length; i++) {
      const sensor = this.sensors[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = sensor.cast(wall);
        if (pt) {
          let d = p5.Vector.dist(this.position, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        this.p.stroke(255);
        this.p.line(this.position.x, this.position.y, closest.x, closest.y);
        this.p.point(closest.x, closest.y)
      }
      scene[i] = record;
    }
    return scene;
  }

  // TODO: Rotate the car when steering
  steer(amount: number) {
    this.position.x += amount;
    this.position.x = this.p.constrain(this.position.x, Vehicle.WIDTH/2, this.p.width - Vehicle.WIDTH/2);
  }

  up(amount: number) {
    this.position.y -= amount;
    this.position.y = this.p.constrain(this.position.y, Vehicle.LENGTH, this.p.height - 60);
  }
}
export default Vehicle;
