import p5 from 'p5';

const s = (sketch) => {
  let pos; let vel; let
    orig;

  sketch.setup = () => {
    sketch.createCanvas(800, 800);
    // ssetAttributes('antialias', true);
    sketch.background(0);
    sketch.stroke(255);
    pos = sketch.createVector(500, 500);
    vel = sketch.createVector(0, 0);
    orig = sketch.createVector(400, 400);
  };

  sketch.draw = () => {
    sketch.background(0, 1);
    const f = p5.Vector.sub(orig, pos);
    f.rotate(sketch.randomGaussian(0, sketch.PI / 2)).mult(0.001);
    vel.add(f).normalize();
    pos.add(vel);
    sketch.point(pos.x, pos.y);
    sketch.noFill();
    sketch.ellipse(400, 400, 30);
  };
};

// noinspection JSPotentiallyInvalidConstructorUsage
new p5(s);
