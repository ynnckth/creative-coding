import Branch from "./Branch.ts";
import p5 from "p5";

const TREE_DEPTH = 10;

const MAX_BRANCH_ANGLE = Math.PI / 5;
const CENTER_ANGLE = Math.PI/2;

const BRANCH_WEIGHT = 0.6;
const START_BRANCH_WEIGHT = 12;

const MIN_BRANCH_LENGTH = 0.6;
const MAX_BRANCH_LENGTH = 0.9;
const MAX_ADDITIONAL_NUM_BRANCHES = 3;
const START_BRANCH_LENGTH = 110;

const COLOR_BROWN = '#331900';
const COLOR_GREEN = '#009900';

// returns a random number between lower and upper (inclusive)
function random(lower: number, upper: number) {
  const rnd = Math.random();
  return rnd*(upper-lower)+lower;
}

class Tree {

  private branches: Branch[];
  private startPos: p5.Vector;

  constructor(private p: p5, canvasWidth: number, canvasHeight: number) {
    this.branches = [];
    this.startPos = p.createVector(canvasWidth/2, canvasHeight);
  }

  sprout(startPos = this.startPos, angle = CENTER_ANGLE, branchLength = START_BRANCH_LENGTH, branchWeight = START_BRANCH_WEIGHT, currentIteration = 0) {
    if (currentIteration > TREE_DEPTH) {
      return;
    }

    let endPos = this.calculatePosition(startPos, angle, branchLength);
    let branchColor = currentIteration >= TREE_DEPTH ? COLOR_GREEN : COLOR_BROWN;

    this.branches.push(new Branch(this.p, startPos, endPos, branchWeight, branchColor, currentIteration));

    // left branch
    this.sprout(endPos,
      angle + random(-MAX_BRANCH_ANGLE, 0),
      branchLength * random(MIN_BRANCH_LENGTH, MAX_BRANCH_LENGTH),
      branchWeight * BRANCH_WEIGHT,
      currentIteration + 1);


    // right branch
    this.sprout(endPos,
      angle + random(0, MAX_BRANCH_ANGLE),
      branchLength * random(MIN_BRANCH_LENGTH, MAX_BRANCH_LENGTH),
      branchWeight * BRANCH_WEIGHT,
      currentIteration + 1);

    // and some more random branches...
    for (let i = 0; i < MAX_ADDITIONAL_NUM_BRANCHES; i++) {
      if (random(0, 1) < 0.5) {
        this.sprout(endPos,
          angle + random(-MAX_BRANCH_ANGLE, MAX_BRANCH_ANGLE),
          branchLength * random(MIN_BRANCH_LENGTH, MAX_BRANCH_LENGTH),
          branchWeight * BRANCH_WEIGHT,
          currentIteration + 1);
      }
    }
  }

  display(depth = TREE_DEPTH) {
    this.branches
      .filter(branch => branch.recursionDepth <= depth)
      .forEach(branch => branch.display());
  }

  private calculatePosition(startPos: p5.Vector, angle: number, length: number) {
    const x = startPos.x - length * Math.cos(angle);
    const y = startPos.y - length * Math.sin(angle);
    return this.p.createVector(x, y);
  }
}
export default Tree;