import p5 from "p5";

import Bird from "./Bird.ts";
import Pipe from "./Pipe.ts";
import Evolution from "./Evolution.ts";

const sketch = (p: p5) => {
  const POPULATION_SIZE = 500;

  const evolution = new Evolution(p);
  let aliveBirds: Bird[] = [];
  let allBirds: Bird[] = []; // Backup of all birds of the current generation
  let pipes: Pipe[] = [];
  let counter = 0;
  let speedUpSlider: p5.Element;

  p.setup = () => {
    p.createCanvas(600, 400);
    for (let i = 0; i < POPULATION_SIZE; i++) {
      aliveBirds[i] = new Bird(p);
    }
    pipes = [];
    speedUpSlider = p.createSlider(1, 100, 1);
  };

  p.draw = () => {
    for (let n = 0; n < Number(speedUpSlider.value()); n++) {
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
        aliveBirds = evolution.createNextGeneration(POPULATION_SIZE, allBirds);
        pipes = [];
        allBirds = [];
      }
    }

    // Drawing
    p.background(211);
    for (let bird of aliveBirds) {
      bird.show();
    }
    for (let pipe of pipes) {
      pipe.show();
    }
  };
};

new p5(sketch);
