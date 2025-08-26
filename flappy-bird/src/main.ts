import p5 from "p5";

import Bird from "./Bird.ts";
import Pipe from "./Pipe.ts";

let bird: Bird;
let pipes: Pipe[] = [];

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(600, 400);

    bird = new Bird(p);
    pipes.push(new Pipe(p));
  };

  p.draw = () => {
    p.background(0);

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hit(bird)) {
        console.log("HIT");
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.update();
    bird.show();

    if (p.frameCount % 75 == 0) {
      pipes.push(new Pipe(p));
    }
  };

  p.keyPressed = (e) => {
    let pressedKey = (e as KeyboardEvent).key;
    if (pressedKey === " ") {
      bird.jump();
    }
  };
};

new p5(sketch);
