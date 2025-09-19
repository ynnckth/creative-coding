const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const INITIAL_BOID_COUNT = 150;

let boids = [];

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let i = 0; i < INITIAL_BOID_COUNT; i++) {
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(245);
  for (let boid of boids) {
    boid.edges();
    boid.flock(boids);
  }
  for (let boid of boids) {
    boid.update();
    boid.show();
  }
}

function mouseDragged() {
  boids.push(new Boid(mouseX, mouseY));
}


