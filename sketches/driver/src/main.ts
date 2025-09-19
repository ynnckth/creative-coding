import p5 from "p5";
import Vehicle from "./Vehicle.ts";
import Track from "./Track.ts";

let car: Vehicle;
let track: Track;

const sketch = (p: p5) => {
  const STEER_LEFT_AMOUNT = -1;
  const STEER_RIGHT_AMOUNT = -1;

  p.setup = () => {
    p.createCanvas(600, 400);
    car = new Vehicle(p);
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
    car.look(track.getWalls());
    car.show();
  };
};

new p5(sketch);
