import { positionTitle } from './typing';
import { showIcon } from './icons';

export let ctx; let
  canv;
export const config = [
  {
    sx: 0.4, sy: 0.45, ex: 0.2, ey: 0.2, diagFirst: true, iconId: 'fa-twitter', href: 'https://twitter.com/SimonBohnen',
  },
  {
    sx: 0.6, sy: 0.45, ex: 0.8, ey: 0.2, diagFirst: true, iconId: 'fa-linkedin', href: 'https://linkedin.com/in/SimonBohnen',
  },
  {
    sx: 0.65, sy: 0.55, ex: 0.85, ey: 0.7, diagFirst: true, iconId: 'fa-stack-overflow', href: 'https://stackoverflow.com/users/7804181/SimonBohnen',
  },
  {
    sx: 0.5, sy: 0.55, ex: 0.5, ey: 0.7, diagFirst: false, iconId: 'fa-envelope', href: 'mailto:simonbohnen@tum.de',
  },
  {
    sx: 0.35, sy: 0.55, ex: 0.15, ey: 0.7, diagFirst: true, iconId: 'fa-github', href: 'https://github.com/SimonBohnen',
  },
];

export function draw() {
  $('#title-wrapper').html('Simon');
  positionTitle();

  canv = document.querySelector('#tagCanvas');
  ctx = canv.getContext('2d');
  // ctx.webkitImageSmoothingEnabled = true;
  // ctx.translate(0.5, 0.5);
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#333333';
  ctx.lineCap = 'round';
  ctx.lineWidth = 2;

  $('#subtitle').fadeIn();
  drawLine(450, 450, 600, 600);
  drawLine(200, 200, 400, 200);
  // drawNextConnector(0);

  $('.socialIcon').css({ width: `${iconRadius * 2}px`, height: `${iconRadius * 2}px`, 'line-height': `${iconRadius * 2}px` });
  // Icons: Mail, Github, Twitter, LinkedIn, Xing, StackOverflow
}

$(window).resize(() => {
  ctx.clearRect(0, 0, canv.width, canv.height);
  $('.socialIcon').remove();
  drawNextConnector(0);
});

function drawNextConnector(index) {
  const curConfig = config[index];
  drawConnector(ctx, curConfig.sx * canv.width, curConfig.sy * canv.height, curConfig.ex * canv.width, curConfig.ey * canv.height, curConfig.diagFirst, curConfig.iconId, curConfig.href);
  if (index < config.length - 1) {
    setTimeout(() => {
      drawNextConnector(index + 1);
    }, 300);
  }
}

export const iconRadius = 38;
const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
const TR = 4;
const BR = 5;
const BL = 6;
const TL = 7;

export const drawspeed = 7;

function drawConnector(ctx, sx, sy, ex, ey, diagFirst, iconId, href) {
  const sideways = Math.abs(ex - sx) > Math.abs(sy - ey);
  const diry = ey > sy ? 1 : -1;
  const dirx = ex > sx ? 1 : -1;
  if (diagFirst) {
    const endDiagX = sideways ? sx + dirx * Math.abs(ey - sy) : ex;
    drawDiagonal(ctx, sx, sy, endDiagX, dirx, diry, 0, () => {
      if (sideways) {
        drawHori(ctx, endDiagX, ey, ex - dirx * iconRadius, dirx, 0, () => {
          drawCircle(ctx, ex, ey, 0, dirx === 1 ? LEFT : RIGHT, iconId, href);
        });
      } else {
        drawVert(ctx, ex, sy + diry * Math.abs(ex - sx), ey - diry * iconRadius, diry, 0, () => {
          drawCircle(ctx, ex, ey, 0, diry === 1 ? TOP : BOTTOM, iconId, href);
        });
      }
    });
  } else if (sideways) {
    const midX = ex - dirx * Math.abs(ey - sy);
    // noinspection DuplicatedCode
    drawHori(ctx, sx, sy, midX, dirx, 0, () => {
      drawDiagonal(ctx, midX, sy, ex - dirx * iconRadius * sqrt2 / 2, dirx, diry, 0, () => {
        drawCircle(ctx, ex, ey, 0, dirx === 1 ? (diry === 1 ? TL : BL) : (diry === 1 ? TR : BR), iconId, href);
      });
    });
  } else {
    const midY = ey - diry * Math.abs(ex - sx);
    // noinspection DuplicatedCode
    drawVert(ctx, sx, sy, midY, diry, 0, () => {
      drawDiagonal(ctx, sx, midY, ex - dirx * iconRadius * sqrt2 / 2, dirx, diry, 0, () => {
        drawCircle(ctx, ex, ey, 0, dirx === 1 ? (diry === 1 ? TL : BL) : (diry === 1 ? TR : BR), iconId, href);
      });
    });
  }
}

let circleimg;

function drawCircle(ctx, x, y, prog, startFrom, iconId, href) {
  if (prog > 2 * iconRadius) {
    showIcon(x, y, iconId, href);
    return;
  }
  if (prog === 0) {
    circleimg = document.getElementById('circle-img');
  }
  prog += drawspeed / 2.0;

  ctx.save();
  ctx.translate(x, y);
  switch (startFrom) {
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
  ctx.clearRect(-iconRadius - 1, -iconRadius - 5, iconRadius * 2 + 6, iconRadius * 2 + 10);
  ctx.drawImage(circleimg, 0, 0, prog, iconRadius * 2, -iconRadius, -iconRadius, prog, iconRadius * 2);
  ctx.restore();
  requestAnimationFrame(() => {
    drawCircle(ctx, x, y, prog, startFrom, iconId, href);
  });
}

const sqrt2 = Math.sqrt(2);

function drawDiagonal(ctx, sx, sy, ex, dirx, diry, progx, callback) {
  ctx.lineWidth = 1;
  const nextX = sx + dirx * progx;
  ctx.clearRect(sx, sy, ex - sx, ex - sx);
  if ((dirx === 1 && nextX < ex) || (dirx === -1 && nextX > ex)) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(nextX, sy + diry * progx);
    ctx.stroke();
    requestAnimationFrame(() => {
      drawDiagonal(ctx, sx, sy, ex, dirx, diry, progx + drawspeed / sqrt2, callback);
    });
  } else {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, sy + diry * Math.abs(ex - sx));
    ctx.stroke();
    callback();
  }
}

function drawVert(ctx, sx, sy, ey, diry, progy, callback) {
  ctx.lineWidth = 2;
  const nextY = sy + diry * progy;
  ctx.clearRect(sx - 2, sy, 4, ey - sy);
  if ((diry === 1 && nextY < ey) || (diry === -1 && nextY > ey)) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx, nextY);
    ctx.stroke();
    requestAnimationFrame(() => {
      drawVert(ctx, sx, sy, ey, diry, progy + drawspeed, callback);
    });
  } else {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx, ey);
    ctx.stroke();
    callback();
  }
}

function drawHori(ctx, sx, sy, ex, dirx, progx, callback) {
  ctx.lineWidth = 2;
  const nextX = sx + dirx * progx;
  ctx.clearRect(sx, sy - 2, ex - sx, 4);
  if ((dirx === 1 && nextX < ex) || (dirx === -1 && nextX > ex)) {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(nextX, sy);
    ctx.stroke();
    requestAnimationFrame(() => {
      drawHori(ctx, sx, sy, ex, dirx, progx + drawspeed, callback);
    });
  } else {
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, sy);
    ctx.stroke();
    callback();
  }
}

function drawLine(sx, sy, ex, ey, prog, sin, cos, len, w, h) {
  if (!prog) {
    const ang = Math.atan2(ey - sy, ex - sx);
    len = Math.sqrt(Math.pow(ey - sy, 2) + Math.pow(ex - sx, 2));
    prog = 0;
    sin = Math.sin(ang);
    cos = Math.cos(ang);
    w = ex - sx;
    h = ey - sy;
  }
  ctx.clearRect(sx - 5, sy - 5, w + 10, h + 10);
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + prog * cos, sy + prog * sin);
  ctx.stroke();
  if (prog < len) {
    requestAnimationFrame(() => {
      drawLine(sx, sy, ex, ey, prog + drawspeed, sin, cos, len, w, h);
    });
  }
}
