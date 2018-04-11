let cellSize = 20;
var cells = [], neighbors = [];
var cellsX, cellsY;

function setup() {
  createCanvas(400, 400);
  cellsX = width / cellSize;
  cellsY = height / cellSize;
  /*
  let oneRow = Array(cellsY);
  oneRow.fill(0);
  cells = Array(cellsX);
  neighbors = Array(cellsX);
  cells.fill(oneRow);
  neighbors.fill(oneRow);
  */
  for (var x = 0; x < cellsX; x++) {
    cells.push([]);
    neighbors.push([]);
    for (var y = 0; y < cellsY; y++) {
      cells[x].push(false);
      neighbors[x].push(0);
    }
  }
  background(0);
  fill(255);
  stroke(255);
  //frameRate(10);
  //rect(20, 20, 40, 40);
}

function draw() {
  background(0);
  for(var x = 0; x < cellsX; ++x) {
    console.log(x);
    for(var y = 0; y < cellsY; ++y) {
      if(neighbors[x][y] < 2) {
        let rx = Math.floor(random(cellsX));
        let ry = Math.floor(random(cellsY))
        cells[rx][ry] = !cells[rx][ry];
        let change = cells[rx][ry] ? 1 : -1;
        for(dx = -1; dx < 2; ++dx) {
          for(dy = -1; dy < 2; ++dy) {
            if((dx != 0 || dy != 0) && rx + dx >= 0 && rx + dx < cellsX && ry + dy >= 0 && ry + dy < cellsY) {
              neighbors[rx + dx][ry + dy] += change;
            }
          }
        }
      }
    }
  }

  //Rendering:
  for(var x = 0; x < cellsX; ++x) {
    for(var y = 0; y < cellsY; ++y) {
      if(cells[x][y]) {
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}
