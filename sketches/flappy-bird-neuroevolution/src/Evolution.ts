import p5 from "p5";
import Bird from "./Bird.ts";

/**
 * Genetic algorithm to create the next generation of birds
 */
class Evolution {
  constructor(private p: p5) {}

  createNextGeneration(populationSize: number, currentGeneration: Bird[]): Bird[] {
    console.log("Next generation");
    this.calculateAndApplyFitness(currentGeneration);

    let newGeneration: Bird[] = [];
    for (let i = 0; i < populationSize; i++) {
      newGeneration[i] = this.pickOne(currentGeneration);
    }
    return newGeneration;
  }

  private calculateAndApplyFitness(currentGeneration: Bird[]) {
    let sumOfScores = 0;
    for (let bird of currentGeneration) {
      sumOfScores += bird.score;
    }
    for (let bird of currentGeneration) {
      bird.fitness = bird.score / sumOfScores;
    }
  }

  private pickOne(currentGeneration: Bird[]) {
    let index = 0;
    let r = this.p.random(1);

    while (r > 0) {
      r -= currentGeneration[index].fitness;
      index++;
    }
    index--;
    let bird = currentGeneration[index];
    let child = new Bird(this.p, bird.brain);
    child.mutate();
    return child;
  }
}
export default Evolution;
