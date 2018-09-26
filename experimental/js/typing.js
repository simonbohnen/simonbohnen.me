WebFont.load({
    google: {
        families: ['Orbitron']
    },
    active: init
});

let beforeWidth, simonWidth;

$(window).resize(positionTitle); //todo canvas redraw!

function positionTitle() {
    let headermarginleft = ($("body").width() - simonWidth) / 2 - beforeWidth;
    $("#title-wrapper").css({"left": headermarginleft + "px"});
}

function init() {
    $(function() {
        const c = document.querySelector("#tagCanvas");
        c.width = 0.98 * window.innerWidth;
        c.height = 0.98 * window.innerHeight;

        beforeWidth = document.getElementById("measureBefore").clientWidth;
        simonWidth = document.getElementById("measureSimon").clientWidth;
        positionTitle();
        $("#flickering").html("|");
        if(location.href.includes("de")) {
            typeString = "Hi, ich bin Simon.";
            config[1].href = "http://xing.to/SimonBohnen";
            config[1].iconId = "fa-xing";
        } else {
            typeString = "Hi, I'm Simon.";
        }

        var birth = new Date('2000-10-12');
        var today = new Date();
        var difference = today - birth;
        var age = new Date(difference).getFullYear() - 1970;
        var span = document.getElementById('age');
        span.innerHTML = age;

        drawNextCharacter(0);
    });
}

let typeString;

function drawNextCharacter(i) {
    if (i < typeString.length) {
        $("#spell").html(typeString.substring(0, i + 1));
        setTimeout(function() {
            drawNextCharacter(i + 1);
        }, i === 3 ? 300 : 70);
    } else {
        const leng = 300;
        $("#flickering").animate({color: "#000"}, leng)
            .animate({color: "#fff"}, leng)
            .animate({color: "#000"}, leng)
            .animate({color: "#fff"}, leng)
            .animate({color: "#000"}, leng);
        setTimeout(function(){
            $("#title-wrapper").html("<span class=\"fade\">" + $("#measureBefore").html() + "</span><span>Simon</span><span class=\"fade\">.</span>");
            $(".fade").animate({color: "#000"}, leng, "swing", waitForDraw);
        }, 2000);
    }
}

let count = 0;

function waitForDraw() {
    if(count === 0) {
        count = 1;
    } else {
        count = 0;
        draw();
    }
}
