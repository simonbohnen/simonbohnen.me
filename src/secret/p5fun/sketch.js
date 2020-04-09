import p5 from 'p5';

const s = (sketch) => {
  const cellSize = 20;
  const cells = [];
  const neighbors = [];
  let cellsX;
  let cellsY;

  sketch.setup = () => {
    sketch.createCanvas(400, 400);
    cellsX = sketch.width / cellSize;
    cellsY = sketch.height / cellSize;

    for (let x = 0; x < cellsX; x += 1) {
      cells.push([]);
      neighbors.push([]);
      for (let y = 0; y < cellsY; y += 1) {
        cells[x].push(false);
        neighbors[x].push(0);
      }
    }
    sketch.background(0);
    sketch.fill(255);
    sketch.stroke(255);
    // frameRate(10);
    // rect(20, 20, 40, 40);
  };

  sketch.draw = () => {
    sketch.background(0);
    for (let x = 0; x < cellsX; x += 1) {
      // console.log(x);
      for (let y = 0; y < cellsY; y += 1) {
        if (neighbors[x][y] < 2) {
          const rx = Math.floor(sketch.random(cellsX));
          const ry = Math.floor(sketch.random(cellsY));
          cells[rx][ry] = !cells[rx][ry];
          const change = cells[rx][ry] ? 1 : -1;
          for (let dx = -1; dx < 2; dx += 1) {
            for (let dy = -1; dy < 2; dy += 1) {
              if ((dx !== 0 || dy !== 0)
                && rx + dx >= 0
                && rx + dx < cellsX
                && ry + dy >= 0
                && ry + dy < cellsY) {
                neighbors[rx + dx][ry + dy] += change;
              }
            }
          }
        }
      }
    }

    // Rendering:
    for (let x = 0; x < cellsX; x += 1) {
      for (let y = 0; y < cellsY; y += 1) {
        if (cells[x][y]) {
          sketch.rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
  };
};

// noinspection JSPotentiallyInvalidConstructorUsage
new p5(s);
