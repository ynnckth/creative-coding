import p5 from "p5";

import Bird from "./Bird.ts";
import Pipe from "./Pipe.ts";

let bird: Bird;
let pipes: Pipe[] = [];

const sketch = (p: p5) => {
  const resetGame = () => {
    bird = new Bird(p);
    pipes = [];
  };

  p.setup = () => {
    p.createCanvas(600, 400);
    resetGame();
  };

  p.draw = () => {
    p.background(211, 211, 211);
    if (!bird.alive) {
      resetGame();
    }
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hit(bird)) {
        bird.die();
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
