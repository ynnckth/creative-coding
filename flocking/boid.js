class Boid {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector(0, 0);
    this.maxForce = 0.05;
    this.maxSpeed = 3.5;
  }

  // Aggregate over neighbors within a perception radius using a mapping function
  // mapFn receives (thisBoid, otherBoid, distance) and should return a p5.Vector to add
  _aggregateNeighbors(boids, perceptionRadius, mapFn) {
    const sum = createVector(0, 0);
    let count = 0;
    for (let other of boids) {
      if (other === this) continue;
      const d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (d < perceptionRadius) {
        sum.add(mapFn(this, other, d));
        count++;
      }
    }
    return { sum, count };
  }

  // Compute steering force toward a target vector (already averaged or computed)
  _steerTowards(targetVector, maxForceScale = 1.0) {
    if (targetVector.magSq() === 0) return createVector(0, 0);
    const desired = targetVector.copy();
    desired.setMag(this.maxSpeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce * maxForceScale);
    return steer;
  }

  edges() {
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }

  align(boids) {
    const perceptionRadius = 50;
    const { sum, count } = this._aggregateNeighbors(
      boids,
      perceptionRadius,
      (_self, other) => other.velocity
    );
    if (count === 0) return createVector(0, 0);
    const averageVelocity = sum.div(count);
    return this._steerTowards(averageVelocity);
  }

  cohesion(boids) {
    const perceptionRadius = 50;
    const { sum, count } = this._aggregateNeighbors(
      boids,
      perceptionRadius,
      (_self, other) => other.position
    );
    if (count === 0) return createVector(0, 0);
    const centerOfMass = sum.div(count);
    const toCenter = p5.Vector.sub(centerOfMass, this.position);
    return this._steerTowards(toCenter);
  }

  separation(boids) {
    const perceptionRadius = 24;
    const { sum, count } = this._aggregateNeighbors(
      boids,
      perceptionRadius,
      (self, other, d) => {
        const diff = p5.Vector.sub(self.position, other.position);
        diff.div(d || 0.0001);
        return diff;
      }
    );
    if (count === 0) return createVector(0, 0);
    const averageRepulsion = sum.div(count);
    return this._steerTowards(averageRepulsion, 1.2);
  }

  flock(boids) {
    const alignment = this.align(boids);
    const cohesion = this.cohesion(boids);
    const separation = this.separation(boids);

    alignment.mult(1.0);
    cohesion.mult(0.8);
    separation.mult(1.5);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    const angle = this.velocity.heading() + radians(90);
    fill(50, 120, 240);
    stroke(30, 90, 190);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(0, -6);
    vertex(-4, 6);
    vertex(4, 6);
    endShape(CLOSE);
    pop();
  }
}


