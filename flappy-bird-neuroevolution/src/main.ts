import p5 from "p5";

import Bird from "./Bird.ts";
import Pipe from "./Pipe.ts";
import { nextGeneration } from "./Genetics.ts";

const sketch = (p: p5) => {
  const POPULATION_SIZE = 500;

  let aliveBirds: Bird[] = [];
  let allBirds: Bird[] = []; // Backup of all birds of the current generation
  let pipes: Pipe[] = [];
  let counter = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
    for (let i = 0; i < POPULATION_SIZE; i++) {
      aliveBirds[i] = new Bird(p);
    }
    pipes = [];
  };

  p.draw = () => {
    if (counter % 75 == 0) {
      pipes.push(new Pipe(p));
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      for (let j = aliveBirds.length - 1; j >= 0; j--) {
        if (pipes[i].hit(aliveBirds[j]) || aliveBirds[j].isOffScreen()) {
          allBirds.push(aliveBirds.splice(j, 1)[0]);
        }
      }
      if (pipes[i].isOffScreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let bird of aliveBirds) {
      bird.flapOrDont(pipes);
      bird.update();
    }

    if (aliveBirds.length === 0) {
      counter = 0;
      aliveBirds = nextGeneration(p, POPULATION_SIZE, allBirds);
      pipes = [];
      allBirds = [];
    }

    // Drawing
    p.background(211, 211, 211);
    for (let bird of aliveBirds) {
      bird.show();
    }
    for (let pipe of pipes) {
      pipe.show();
    }
  };
};

new p5(sketch);
