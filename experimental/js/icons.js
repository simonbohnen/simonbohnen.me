function showIcon(x, y, iconId, href) {
    let canv = document.querySelector("#tagCanvas");
    $("body").append('<div class="socialIcon" id="' + iconId + '"><a class="fab ' + iconId + '"></a></div>');
    const icon = $("#" + iconId);
    icon.css({"left": (x - iconRadius) + "px", "top": (y - iconRadius) + "px", "width": (iconRadius * 2) + "px", "height": (iconRadius * 2) + "px"});
    icon.animate({"color": "#ffffff"}, 300);
    let oldCanv = cloneCircle(canv, x, y);

    icon.hover(function() {
        //hoverIn
        icon.stop(true, false);
        icon.animate({"color": "#000000"}, 300);
        fillCircle(x, y, 0, "#ffffff", iconRadius * 0.95);
    }, function() {
        //hoverOut
        icon.stop(true, false);
        icon.animate({"color": "#ffffff"}, 300);
        fillCircle(x, y, 0, "rgba(0, 0, 0, 0.3)", iconRadius * 0.9, function() {
            ctx.clearRect(x - iconRadius, y - iconRadius, iconRadius * 2, iconRadius * 2);
            ctx.drawImage(oldCanv, x - iconRadius, y - iconRadius);
        });
    });
    icon.click(function() {
        window.open(href, '_blank');;
    });
}

function fillCircle(x, y, prog, color, radius, callback) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0.5 * Math.PI - prog, 0.5 * Math.PI + prog);
    ctx.closePath();
    ctx.fill();
    if(prog < Math.PI) {
        requestAnimationFrame(function () {
            fillCircle(x, y, prog + drawspeed / 50, color, radius, callback);
        });
    } else if (callback) {
        callback();
    }
}

function cloneCircle(oldCanvas, x, y) {
    //create a new canvas
    let newCanvas = document.createElement('canvas');
    let context = newCanvas.getContext('2d');
    //set dimensions
    newCanvas.width = 2 * iconRadius;
    newCanvas.height = 2 * iconRadius;
    //apply the old canvas to the new one
    context.drawImage(oldCanvas, x - iconRadius, y - iconRadius, 2 * iconRadius, 2 * iconRadius, 0, 0, 2 * iconRadius, 2 * iconRadius);
    //return the new canvas
    return newCanvas;
}
