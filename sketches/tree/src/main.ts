import p5 from "p5";
import Tree from "./Tree.ts";


const sketch = (p: p5) => {
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const DEFAULT_TREE_DEPTH = 10;

  let tree: Tree;
  let slider: p5.Element;
  let treeDepthToDisplay = DEFAULT_TREE_DEPTH;

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    slider = p.createSlider(0, DEFAULT_TREE_DEPTH, DEFAULT_TREE_DEPTH);
    slider.position(20, 20);

    p.smooth();
    p.strokeCap(p.PROJECT);

    tree = new Tree(p, CANVAS_WIDTH, CANVAS_HEIGHT);
    tree.sprout();
    tree.display();
  };

  p.draw = () => {
    let sliderValue = slider.value();
    if (sliderValue !== treeDepthToDisplay) {
      p.background(255);
      treeDepthToDisplay = Number(sliderValue);
      tree.display(treeDepthToDisplay);
    }
  };
};

new p5(sketch);

