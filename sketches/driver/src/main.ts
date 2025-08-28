import p5 from "p5";
import Car from "./Car.ts";
import Track from "./Track.ts";

let car: Car;
let track: Track;

const sketch = (p: p5) => {
  const STEER_LEFT_AMOUNT = -1;
  const STEER_RIGHT_AMOUNT = -1;

  p.setup = () => {
    p.createCanvas(600, 400);
    car = new Car(p);
    track = new Track(p);
  };

  p.draw = () => {
    if (p.keyIsDown(p.LEFT_ARROW)) {
      car.steer(STEER_LEFT_AMOUNT);
    } else if (p.keyIsDown(p.RIGHT_ARROW)) {
      car.steer(-STEER_RIGHT_AMOUNT);
    }

    p.background(211, 211, 211);
    track.update();
    track.show();
    car.update();
    car.show();
  };
};

new p5(sketch);
