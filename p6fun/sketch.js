var pos, vel, orig;

function setup() {
  createCanvas(800, 800);
  background(0);
  stroke(255);
  pos = createVector(500, 500);
  vel = createVector(0, 0);
  orig = createVector(400, 400);
}

function draw() {
  background(0, 1);
  let f = p5.Vector.sub(orig, pos);
  f.rotate(randomGaussian(0, PI / 2)).mult(0.001);
  vel.add(f).normalize();
  pos.add(vel);
  point(pos.x, pos.y);
}
