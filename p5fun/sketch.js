let cellSize = 20;
var cells, neighbors;
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
  for(int x = 0; x < cellsX; ++x) {
    cells.push([]);
    neighbors.push([]);
    for(int y = 0; y < cellsY; ++y) {
      cells[x].push(false);
      neighbors[x].push(false);
    }
  }
  background(0);
  fill(255);
  stroke(255);
  rect(20, 20, 40, 40);
}
/*
function draw() {
  background(0);
  for(int x = 0; x < cellsX; ++x) {
    for(int y = 0; y < cellsY; ++y) {
      if(neighbors[x][y] < 4) {
        int rx = floor(random(width));
        int ry = floor(random(height))
        cells[rx][ry] = !cells[rx][ry];
        int change = cells[rx][ry] ? 1 : -1;
        for(dx = -1; dx < 2; ++dx) {
          for(dy = -1; dy < 2; ++dy) {
            if((dx != 0 || dy != 0) && dx >= 0 && dx < cellsX && dy >= 0 && dy < cellsY) {
              neighbors[dx][dy] += change;
            }
          }
        }
      }
    }
  }

  //Rendering:
  for(int x = 0; x < cellsX; ++x) {
    for(int y = 0; y < cellsY; ++y) {
      if(cells[x][y]) {
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}
*/
