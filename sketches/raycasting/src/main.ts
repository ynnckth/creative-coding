import p5 from "p5";
import Wall from "./Wall.ts";
import Particle from "./Particle.ts";

const sketch = (p: p5) => {
  let walls: Wall[] = [];
  let particle: Particle;

  const sceneW = 400;
  const sceneH = 400;
  let fieldOfViewSlider: p5.Element;

  p.setup = () => {
    p.createCanvas(800, 400);
    for (let i = 0; i < 4; i++) {
      let x1 = p.random(sceneW);
      let x2 = p.random(sceneW);
      let y1 = p.random(sceneH);
      let y2 = p.random(sceneH);
      walls[i] = new Wall(p, x1, y1, x2, y2);
    }
    // Walls around the canvas borders
    walls.push(new Wall(p, 0, 0, sceneW, 0));
    walls.push(new Wall(p, sceneW, 0, sceneW, sceneH));
    walls.push(new Wall(p, sceneW, sceneH, 0, sceneH));
    walls.push(new Wall(p, 0, sceneH, 0, 0));

    particle = new Particle(p, sceneW, sceneH);
    fieldOfViewSlider = p.createSlider(0, 360, 60);
    fieldOfViewSlider.mouseMoved(() => particle.updateFieldOfView(Number(fieldOfViewSlider.value())));
  };

  p.draw = () => {
    if (p.keyIsDown(p.LEFT_ARROW)) {
      particle.rotate(-0.01);
    } else if (p.keyIsDown(p.RIGHT_ARROW)) {
      particle.rotate(0.01);
    } else if (p.keyIsDown(p.UP_ARROW)) {
      particle.move(1);
    } else if (p.keyIsDown(p.DOWN_ARROW)) {
      particle.move(-1);
    }

    p.background(0);
    for (let wall of walls) {
      wall.show();
    }
    particle.show();

    const scene = particle.look(walls);
    const w = sceneW / scene.length;
    p.push();
    p.translate(sceneW, 0);
    for (let i = 0; i < scene.length; i++) {
      p.noStroke();
      const sq = scene[i] * scene[i];
      const wSq = sceneW * sceneW;
      const b = p.map(sq, 0, wSq, 255, 0);
      const h = p.map(scene[i], 0, sceneW, sceneH, 0);
      p.fill(b);
      p.rectMode(p.CENTER);
      p.rect(i * w + w / 2, sceneH / 2, w + 1, h);
    }
    p.pop();
  };
};

new p5(sketch);
