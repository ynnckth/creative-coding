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

    p.fill(0);
    p.text(`Score: ${bird.score}`, 10, 20);

    if (!bird.alive) {
      resetGame();
    }
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hit(bird)) {
        bird.die();
      }
      if (pipes[i].isOffScreen()) {
        pipes.splice(i, 1);
        bird.increaseScore();
      }
    }
    bird.update();
    bird.show();

    if (p.frameCount % 75 == 0) {
      pipes.push(new Pipe(p));
    }
  };
};

new p5(sketch);
