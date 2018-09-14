function draw() {
  $(".fade").css({"visibility": "hidden"});

  var c = document.querySelector("#tagCanvas");
  var ctx = c.getContext("2d");
  ctx.webkitImageSmoothingEnabled = true;
  ctx.translate(0.5, 0.5);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  //ctx.rect(200, 100, 5, 5);
  //ctx.rect(200, 500, 10, 10);
  /*ctx.rect(500, 500, 10, 10);
  ctx.rect(500, 400, 10, 10);
  ctx.rect(800, 500, 10, 10);
  ctx.rect(500, 700, 10, 10);*/
  var circleimg = document.getElementById("circle-img");
  //ctx.drawImage(circleimg, 100, 100);




  drawConnector(ctx, 400, 400, 800, 600, false);



  //drawConnector(ctx, 400, 300, 500, 700, true);
  //drawDiagonal(ctx, 400, 200, 500, 1, 1, 0, null);

  /*$(".GermanSpelling").each(function () {
  typeString = "Hi, ich bin Simon.";
  delays.push(70);
  delays.push(70);
  delays.push(70);
  delays.push(70);
});*/
}


const iconRadius = 40;
const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
const TR = 4;
const BR = 5;
const BL = 6;
const TL = 7;

const drawspeed = 7;
const sqrt2 = 0.5;

function drawConnector(ctx, sx, sy, ex, ey, diagFirst) {
  var sideways = Math.abs(ex - sx) > Math.abs(sy - ey);
  var diry = ey > sy ? 1 : -1;
  var dirx = ex > sx ? 1 : -1;
  if(diagFirst) {
    var endDiagX = sideways ? sx + dirx * Math.abs(ey - sy) : ex;
    drawDiagonal(ctx, sx, sy, endDiagX, dirx, diry, 0, function() {
      if(sideways) {
        drawHori(ctx, endDiagX, ey, ex - dirx * iconRadius, dirx, 0, function() { drawCircle(ctx, ex, ey, 0, dirx == 1 ? LEFT : RIGHT) });
      } else {
        drawVert(ctx, ex, sy + diry * Math.abs(ex - sx), ey - diry * iconRadius, diry, 0, function() { drawCircle(ctx, ex, ey, 0, diry == 1 ? TOP : BOTTOM) });
      }
    });
  } else {
    if(sideways) {
      var midX = ex - dirx * Math.abs(ey - sy);
      drawHori(ctx, sx, sy, midX, dirx, 0, function() {
        drawDiagonal(ctx, midX, sy, ex - dirx * iconRadius * sqrt2, dirx, diry, 0, function() { drawCircle(ctx, ex, ey, 0, dirx == 1 ? (diry == 1 ? BL : TL) : (diry == 1 ? BR : TR)) });
      });
      //todo ende wird gecleart von kreis....
    } else {

    }
  }
}

var circleimg;

function drawCircle(ctx, x, y, prog, startFrom, callback) {
  ctx.save();
  if(prog == 0) {
    circleimg = document.getElementById("circle-img");
  }
  ctx.translate(x, y);
  ctx.clearRect(-iconRadius, -iconRadius, iconRadius * 2, iconRadius * 2);
  switch(startFrom) {
    case TOP:
    ctx.rotate(0.5 * Math.PI);
    break;
    case RIGHT:
    ctx.rotate(Math.PI);
    break;
    case BOTTOM:
    ctx.rotate(1.5 * Math.PI);
    break;
    case TR:
    ctx.rotate(0.75 * Math.PI);
    break;
    case BR:
    ctx.rotate(1.25 * Math.PI);
    break;
    case BL:
    ctx.rotate(1.75 * Math.PI);
    break;
    case TL:
    ctx.rotate(0.25 * Math.PI);
    break;
  }
  //ctx.rect(-iconRadius, -iconRadius, iconRadius * 2, iconRadius * 2);
  //ctx.drawImage(circleimg, -iconRadius, -iconRadius);
  ctx.drawImage(circleimg, 0, 0, prog, iconRadius * 2, -iconRadius, -iconRadius, prog, iconRadius * 2);
  /*ctx.rect(-iconRadius, -iconRadius, prog, iconRadius * 2);
  ctx.fill();*/
  ctx.restore();
  if(prog < 2 * iconRadius) {
    requestAnimationFrame(function() {
      drawCircle(ctx, x, y, prog + drawspeed / 2.0, startFrom, callback);
    });
  } else {
    circleInit = false;
    if(callback) {
      callback();
    }
  }
}

function drawSecondPart(ctx, sx, sy, ex, ey, dirx, diry, diagFirst, sideways, endDiagX) {
  if(diagFirst) {
    if(sideways) {
      drawHori(ctx, endDiagX, ey, ex, dirx, 0, null)
    } else {
      drawVert(ctx, ex, sy - ex + sx, ey, diry, 0, null);
    }
  } else {

  }
}

function drawDiagonal(ctx, sx, sy, ex, dirx, diry, progx, callback) {
  //ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  var nextX = sx + dirx * progx;
  if((dirx == 1 && nextX < ex) || (dirx == -1 && nextX > ex)) {
    ctx.moveTo(sx, sy);
    ctx.lineTo(nextX, sy + diry * progx);
    ctx.stroke();
    requestAnimationFrame(function() {
      drawDiagonal(ctx, sx, sy, ex, dirx, diry, progx + drawspeed, callback);
    });
  } else {
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, sy + diry * Math.abs(ex - sx));
    ctx.stroke();
    callback();
  }
}

function drawVert(ctx, sx, sy, ey, diry, progy, callback) {
  //ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  var nextY = sy + diry * progy;
  if((diry == 1 && nextY < ey) || (diry == -1 && nextY > ey)) {
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx, nextY);
    ctx.stroke();
    requestAnimationFrame(function() {
      drawVert(ctx, sx, sy, ey, diry, progy + drawspeed, callback);
    });
  } else {
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx, ey);
    ctx.stroke();
    callback();
  }
}

function drawHori(ctx, sx, sy, ex, dirx, progx, callback) {
  //ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  nextX = sx + dirx * progx;
  if((dirx == 1 && nextX < ex) || (dirx == -1 && nextX > ex)) {
    ctx.moveTo(sx, sy);
    ctx.lineTo(nextX, sy);
    ctx.stroke();
    requestAnimationFrame(function() {
      drawHori(ctx, sx, sy, ex, dirx, progx + drawspeed, callback);
    });
  } else {
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, sy);
    ctx.stroke();
    callback();
  }
}
