import p5 from "p5";

class Car {
  private static readonly WIDTH = 35;
  private static readonly LENGTH = 50;

  private position: number;

  constructor(private p: p5) {
    this.position = this.p.width / 2;
  }

  show() {
    this.p.fill(255);
    this.p.rect(this.position - Car.WIDTH/2, this.p.height - 60, Car.WIDTH, Car.LENGTH);
  }

  update() {
  }

  // TODO: Rotate the car when steering
  steer(amount: number) {
    this.position += amount;
    this.position = this.p.constrain(this.position, Car.WIDTH/2, this.p.width - Car.WIDTH/2);
  }
}
export default Car;
