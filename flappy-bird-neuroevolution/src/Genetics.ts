import p5 from "p5";
import Bird from "./Bird.ts";

export function nextGeneration(p: p5, populationSize: number, allBirds: Bird[]): Bird[] {
  console.log("Next generation");
  calculateAndApplyFitness(allBirds);

  let newBirds: Bird[] = [];
  for (let i = 0; i < populationSize; i++) {
    newBirds[i] = pickOne(p, allBirds);
  }
  return newBirds;
}

function calculateAndApplyFitness(birds: Bird[]) {
  let sumOfScores = 0;
  for (let bird of birds) {
    sumOfScores += bird.score;
  }
  for (let bird of birds) {
    bird.fitness = bird.score / sumOfScores;
  }
}

function pickOne(p: p5, allBirds: Bird[]) {
  let index = 0;
  let r = p.random(1);

  while (r > 0) {
    r -= allBirds[index].fitness;
    index++;
  }
  index--;
  let bird = allBirds[index];
  let child = new Bird(p, bird.brain);
  child.mutate();
  return child;
}
