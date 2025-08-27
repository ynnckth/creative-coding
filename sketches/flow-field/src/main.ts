import p5 from "p5";

const sketch = (p: p5) => {
  const scale = 20;
  const noiseIncrement = 0.1;
  const noiseTimeIncrement = 0.0002;

  let columns: number, rows: number;
  let noiseX: number, noiseY: number, noiseZ: number;

  p.setup = () => {
    p.createCanvas(800, 800);
    p.background('#202020');
    p.rectMode(p.CENTER);

    columns = p.floor(p.width / scale);
    rows = p.floor(p.height / scale);
    noiseX = 0;
    noiseZ = 0;
  };

  p.draw = () => {
    p.background('#202020');

    noiseY = 0;
    for (let y = 1; y < rows-1; y++) {
      noiseX = 0;
      for (let x = 1; x < columns-1; x++) {
        let angle = p.noise(noiseX, noiseY, noiseZ) * p.TWO_PI;
        let color = p.map(angle, 0, p.TWO_PI, 0, 255);
        let vector = p5.Vector.fromAngle(angle);
        p.stroke(color);
        p.strokeWeight(2);

        p.push();
        p.translate(x * scale, y * scale);
        p.rotate(vector.heading());
        p.rect(0, 0, scale*0.9, 0);
        p.pop();

        noiseX += noiseIncrement;
      }
      noiseY += noiseIncrement;
      noiseZ += noiseTimeIncrement;
    }
  }
};

new p5(sketch);

