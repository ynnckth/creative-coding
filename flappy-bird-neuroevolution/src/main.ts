import p5 from "p5";

import Bird from "./Bird.ts";
import Pipe from "./Pipe.ts";
import Evolution from "./Evolution.ts";

const sketch = (p: p5) => {
  const POPULATION_SIZE = 500;

  const evolution = new Evolution(p);
  let activeBirds: Bird[] = [];
  let allBirds: Bird[] = []; // Backup of all birds of the current generation
  let pipes: Pipe[] = [];
  let counter = 0;
  let currentGeneration = 0;
  let highScore = 0;

  let speedUpSlider: p5.Element;
  let exportBestBrainButton: p5.Element;

  const getCurrentHighScore = () => {
    let currentHighScore = 0;
    for (let bird of activeBirds) {
      if (bird.score > currentHighScore) {
        currentHighScore = bird.score;
      }
    }
    if (currentHighScore > highScore) {
      highScore = currentHighScore;
    }
    return currentHighScore;
  };

  const findCurrentBestBird = () => {
    let bestBird = activeBirds[0];
    for (let bird of activeBirds) {
      if (bird.score > bestBird.score) {
        bestBird = bird;
      }
    }
    return bestBird;
  };

  p.setup = () => {
    p.createCanvas(600, 400);
    for (let i = 0; i < POPULATION_SIZE; i++) {
      activeBirds[i] = new Bird(p);
    }
    pipes = [];

    speedUpSlider = p.createSlider(1, 100, 1);
    p.createP();
    exportBestBrainButton = p.createButton("Export best brain");
    exportBestBrainButton.mouseClicked(() => {
      p.save(findCurrentBestBird().brain.serialize(), "best_bird.json");
    });
  };

  p.draw = () => {
    for (let n = 0; n < Number(speedUpSlider.value()); n++) {
      if (counter % 75 == 0) {
        pipes.push(new Pipe(p));
      }
      counter++;

      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();

        for (let j = activeBirds.length - 1; j >= 0; j--) {
          if (pipes[i].hit(activeBirds[j]) || activeBirds[j].isOffScreen()) {
            allBirds.push(activeBirds.splice(j, 1)[0]);
          }
        }
        if (pipes[i].isOffScreen()) {
          pipes.splice(i, 1);
        }
      }

      for (let bird of activeBirds) {
        bird.process(pipes);
        bird.update();
      }

      if (activeBirds.length === 0) {
        counter = 0;
        activeBirds = evolution.createNextGeneration(POPULATION_SIZE, allBirds);
        pipes = [];
        allBirds = [];
        currentGeneration++;
      }
    }

    // Drawing
    p.background(211);
    for (let bird of activeBirds) {
      bird.show();
    }
    for (let pipe of pipes) {
      pipe.show();
    }
    p.fill(0);
    p.strokeWeight(0.5);
    p.text(`Generation: ${currentGeneration}`, 10, 20);
    p.text(`No of birds: ${activeBirds.length}`, 10, 40);
    p.text(`Generation high score: ${getCurrentHighScore()}`, 10, 60);
    p.text(`All time high score: ${highScore}`, 10, 80);
  };
};

new p5(sketch);
