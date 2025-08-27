import p5 from "p5";


const sketch = (p: p5) => {
  /*
	A single configuration showing the connection points a, b, c and d
    x------a------x
		|							|
		d							b
		|							|
		x------c------x
*/
  const CANVAS_WIDTH = 700;
  const CANVAS_HEIGHT = 700;
  const RESOLUTION = 5;

  let cols: number, rows: number;
  let baseField: any;

  // noise configuration
  const NOISE_INCREMENT = 0.01;
  let xoff, yoff = 0.0;

  const initField = (cols: number, rows: number) => {
    const field = new Array(cols);
    for (let col = 0; col < cols; col++) {
      field[col] = new Array(rows);
    }
    return field;
  };

  const calculateCurrentConfiguration = (a: any, b: any, c: any, d: any) => a * 8 + b * 4 + c * 2 + d * 1;

  const drawLineBetweenVectors = (a: p5.Vector, b: p5.Vector, row: number, col: number) => {
    const elevation = p.map(baseField[row][col], 0, 1, 0, 600) - 200;
    p.line(a.x, a.y, elevation, b.x, b.y, elevation);
  };

  const drawConfiguration = (config: number, a: p5.Vector, b: p5.Vector, c: p5.Vector, d: p5.Vector, row: number, col: number) => {
    switch (config) {
      case 1:
        drawLineBetweenVectors(c, d, row, col);
        break;
      case 2:
        drawLineBetweenVectors(b, c, row, col);
        break;
      case 3:
        drawLineBetweenVectors(b, d, row, col);
        break;
      case 4:
        drawLineBetweenVectors(a, b, row, col);
        break;
      case 5:
        drawLineBetweenVectors(a, d, row, col);
        drawLineBetweenVectors(b, c, row, col);
        break;
      case 6:
        drawLineBetweenVectors(a, c, row, col);
        break;
      case 7:
        drawLineBetweenVectors(a, d, row, col);
        break;
      case 8:
        drawLineBetweenVectors(a, d, row, col);
        break;
      case 9:
        drawLineBetweenVectors(a, c, row, col);
        break;
      case 10:
        drawLineBetweenVectors(a, b, row, col);
        drawLineBetweenVectors(c, d, row, col);
        break;
      case 11:
        drawLineBetweenVectors(a, b, row, col);
        break;
      case 12:
        drawLineBetweenVectors(b, d, row, col);
        break;
      case 13:
        drawLineBetweenVectors(b, c, row, col);
        break;
      case 14:
        drawLineBetweenVectors(c, d, row, col);
        break;
    }
  };

  const drawIsoLines = (field: any) => {
    for (let col = 0; col < cols-1; col++) {
      for (let row = 0; row < rows-1; row++) {
        let x = row * RESOLUTION;
        let y = col * RESOLUTION;

        let a = p.createVector(x + RESOLUTION/2, y);
        let b = p.createVector(x + RESOLUTION, y + RESOLUTION/2);
        let c = p.createVector(x + RESOLUTION/2, y + RESOLUTION);
        let d = p.createVector(x, y + RESOLUTION/2);

        let currentConfig = calculateCurrentConfiguration(
          p.round(field[row][col]),
          p.round(field[row+1][col]),
          p.round(field[row+1][col+1]),
          p.round(field[row][col+1]));
        drawConfiguration(currentConfig, a, b, c, d, row, col);
      }
    }
  };

  const calculateFieldValues = (field: any) => {
    xoff = 0;
    for (let col = 0; col < cols; col++) {
      xoff += NOISE_INCREMENT;
      yoff = 0;
      for (let row = 0; row < rows; row++) {
        field[row][col] = p.noise(xoff, yoff);
        yoff += NOISE_INCREMENT;
      }
    }
  };

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p.WEBGL);
    p.background('#202020');

    p.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    p.rotateX(p.PI/3);
    p.translate(-CANVAS_WIDTH, -CANVAS_HEIGHT);

    cols = 1 + p.floor(CANVAS_WIDTH / RESOLUTION);
    rows = 1 + p.floor(CANVAS_HEIGHT / RESOLUTION);
    baseField = initField(rows, cols);
    calculateFieldValues(baseField);

    const numberOfPlains = 60;

    for (let currentPlainIdx = 0; currentPlainIdx < numberOfPlains; currentPlainIdx++) {
      const currentPlain = initField(rows, cols);
      const plainBoundary = p.map(currentPlainIdx, 0, numberOfPlains, 0, 1);

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          currentPlain[row][col] = baseField[row][col];
          const currentValue = currentPlain[row][col];
          if (currentValue < plainBoundary || currentValue > plainBoundary + 1) {
            currentPlain[row][col] = 0;
          } else {
            currentPlain[row][col] = 0.5;
          }
        }
      }

      // every 5th elevation contour should be bolder and darker
      if (currentPlainIdx % 5 == 0) {
        p.strokeWeight(2);
      } else {
        p.strokeWeight(1);
      }
      let blueColor = p.color('#09B9E2');
      let redColor = p.color('#B25958');
      let gradient = p.lerpColor(redColor, blueColor, currentPlainIdx / numberOfPlains);
      p.stroke(gradient);

      drawIsoLines(currentPlain);
    }
  };
};

new p5(sketch);

