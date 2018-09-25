let ctx, canv;
let config = [
    {sx: 400, sy: 400, ex: 600, ey: 800, diagFirst: false, iconId: "fa-stack-overflow", href: "https://stackoverflow.com/users/7804181/SimonBohnen"},
    {sx: 1000, sy: 800, ex: 1400, ey: 600, diagFirst: false, iconId: "fa-twitter", href: "https://twitter.com/SimonBohnen"}
    /*{sx: 400, sy: 400, ex: 400, ey: 400, diagFirst: false, iconId: "fa-stack-overflow", href: "mailto:simonbohnen@tum.de"},
    {sx: 400, sy: 400, ex: 400, ey: 400, diagFirst: false, iconId: "fa-stack-overflow", href: "https://github.com/SimonBohnen"},
    {sx: 400, sy: 400, ex: 400, ey: 400, diagFirst: false, iconId: "fa-stack-overflow", href: "https://xing.to/SimonBohnen"},
    {sx: 400, sy: 400, ex: 400, ey: 400, diagFirst: false, iconId: "fa-stack-overflow", href: "https://linkedin.com/in/SimonBohnen"},
    {sx: 400, sy: 400, ex: 400, ey: 400, diagFirst: false, iconId: "fa-stack-overflow", href: "https://www.stackoverflow.com/"},
    {sx: 400, sy: 400, ex: 400, ey: 400, diagFirst: false, iconId: "fa-stack-overflow", href: "https://www.stackoverflow.com/"}*/
];

function draw() {
    $("#title-wrapper").html("Simon");
    beforeWidth = 0;
    positionTitle();

    canv = document.querySelector("#tagCanvas");
    ctx = canv.getContext("2d");
    ctx.webkitImageSmoothingEnabled = true;
    //ctx.translate(0.5, 0.5);
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineCap="round";

    $("#subtitle").fadeIn();
    drawNextConnector(0);

    //drawConnector(ctx, 400, 300, 500, 700, true);
    //drawDiagonal(ctx, 400, 200, 500, 1, 1, 0, null);

    $(".socialIcon").css({"width": (iconRadius * 2) + "px", "height": (iconRadius * 2) + "px", "line-height": (iconRadius * 2) + "px"});
    //Icons: Mail, Github, Twitter, LinkedIn, Xing, StackOverflow
}

function drawNextConnector(index) {
    let curConfig = config[index];
    drawConnector(ctx, curConfig.sx, curConfig.sy, curConfig.ex, curConfig.ey, curConfig.diagFirst, curConfig.iconId, curConfig.href);
    if(index < config.length - 1) {
        setTimeout(function () {
            drawNextConnector(index + 1);
        }, 300);
    }
}

const iconRadius = 38;
const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
const TR = 4;
const BR = 5;
const BL = 6;
const TL = 7;

const drawspeed = 7;

function drawConnector(ctx, sx, sy, ex, ey, diagFirst, iconId, href) {
    const sideways = Math.abs(ex - sx) > Math.abs(sy - ey);
    const diry = ey > sy ? 1 : -1;
    const dirx = ex > sx ? 1 : -1;
    if(diagFirst) {
        const endDiagX = sideways ? sx + dirx * Math.abs(ey - sy) : ex;
        drawDiagonal(ctx, sx, sy, endDiagX, dirx, diry, 0, function() {
            if(sideways) {
                drawHori(ctx, endDiagX, ey, ex - dirx * iconRadius, dirx, 0, function() {
                    drawCircle(ctx, ex, ey, 0, dirx === 1 ? LEFT : RIGHT, iconId, href);
                });
            } else {
                drawVert(ctx, ex, sy + diry * Math.abs(ex - sx), ey - diry * iconRadius, diry, 0, function() {
                    drawCircle(ctx, ex, ey, 0, diry === 1 ? TOP : BOTTOM, iconId, href);
                });
            }
        });
    } else {
        if(sideways) {
            const midX = ex - dirx * Math.abs(ey - sy);
            drawHori(ctx, sx, sy, midX, dirx, 0, function() {
                drawDiagonal(ctx, midX, sy, ex - dirx * iconRadius * sqrt2 / 2, dirx, diry, 0, function() {
                    drawCircle(ctx, ex, ey, 0, dirx === 1 ? (diry === 1 ? TL : BL) : (diry === 1 ? TR : BR), iconId, href);
                });
            });
        } else {
            const midY = ey - diry * Math.abs(ex - sx);
            drawVert(ctx, sx, sy, midY, diry, 0, function() {
                drawDiagonal(ctx, sx, midY, ex - dirx * iconRadius * sqrt2 / 2, dirx, diry, 0, function() {
                    drawCircle(ctx, ex, ey, 0, dirx === 1 ? (diry === 1 ? TL : BL) : (diry === 1 ? TR : BR), iconId, href);
                });
            });
        }
    }
}

let circleimg;

function drawCircle(ctx, x, y, prog, startFrom, iconId, href) {
    if(prog > 2 * iconRadius) {
        showIcon(x, y, iconId, href);
        return;
    } else {
        if(prog === 0) {
            circleimg = document.getElementById("circle-img");
        }
        prog += drawspeed / 2.0;
    }
    ctx.save();
    ctx.translate(x, y);
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
    ctx.clearRect(-iconRadius - 1, -iconRadius - 5, iconRadius * 2 + 6, iconRadius * 2 + 10);
    ctx.drawImage(circleimg, 0, 0, prog, iconRadius * 2, -iconRadius, -iconRadius, prog, iconRadius * 2);
    ctx.restore();
    requestAnimationFrame(function() {
        drawCircle(ctx, x, y, prog, startFrom, iconId, href);
    });
}

function drawCircle2(ctx, x, y, prog, angle, iconId, href) {
    if(prog === 0) {
        circleimg = document.getElementById("circle-img");
    }
    ctx.save();
    ctx.rotate(angle);
    ctx.clearRect(-iconRadius - 1, -iconRadius - 5, iconRadius * 2 + 6, iconRadius * 2 + 10);
    ctx.drawImage(circleimg, 0, 0, prog, iconRadius * 2, -iconRadius, -iconRadius, prog, iconRadius * 2);
    ctx.restore();
    if(prog < 2 * iconRadius) {
        requestAnimationFrame(function() {
            drawCircle(ctx, x, y, prog + drawspeed / 2.0, angle, iconId, href);
        });
    } else {
        showIcon(x, y, iconId, href);
    }
}

const sqrt2 = Math.sqrt(2);

function drawDiagonal(ctx, sx, sy, ex, dirx, diry, progx, callback) {
    ctx.lineWidth = 1;
    const nextX = sx + dirx * progx;
    if((dirx === 1 && nextX < ex) || (dirx === -1 && nextX > ex)) {
        ctx.clearRect(sx, sy, ex - sx, ex - sx);
        ctx.moveTo(sx, sy);
        ctx.lineTo(nextX, sy + diry * progx);
        ctx.stroke();
        requestAnimationFrame(function() {
            drawDiagonal(ctx, sx, sy, ex, dirx, diry, progx + drawspeed / sqrt2, callback);
        });
    } else {
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, sy + diry * Math.abs(ex - sx));
        ctx.stroke();
        callback();
    }
}

function drawVert(ctx, sx, sy, ey, diry, progy, callback) {
    ctx.lineWidth = 2;
    const nextY = sy + diry * progy;
    if((diry === 1 && nextY < ey) || (diry === -1 && nextY > ey)) {
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
    ctx.lineWidth = 2;
    let nextX = sx + dirx * progx;
    if((dirx === 1 && nextX < ex) || (dirx === -1 && nextX > ex)) {
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
