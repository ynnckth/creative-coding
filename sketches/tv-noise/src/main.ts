import p5 from "p5";

const sketch = (p: p5) => {
  const SKETCH_WIDTH = 1000;
  const SKETCH_HEIGHT = 1000;

  const RESOLUTION = 7;
  const COLOR_BLACK = 0;

  let cols: number, rows: number;
  let field: number[][];

  let xoff = 0;
  let yoff = 0;
  let zoff = 0;

  const initField = (cols: number, rows: number) => {
    field = new Array(cols);
    for (let col = 0; col < cols; col++) {
      field[col] = new Array(rows);
    }
    return field;
  }

  p.setup = () => {
    p.createCanvas(SKETCH_WIDTH, SKETCH_HEIGHT);
    p.background(COLOR_BLACK);
    cols = p.floor(SKETCH_WIDTH / RESOLUTION);
    rows = p.floor(SKETCH_HEIGHT / RESOLUTION);
    field = initField(rows, cols);
  };

  p.draw = () => {
    p.noStroke();
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        field[row][col] = p.noise(xoff, yoff, zoff);
        yoff += 0.3;
      }
      xoff += 0.3;
    }

    zoff += 0.3;

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        p.fill(field[row][col] * 255);
        p.rect(row * RESOLUTION, col * RESOLUTION, RESOLUTION, RESOLUTION)
      }
    }
  }
};

new p5(sketch);

