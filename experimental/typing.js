WebFont.load({
  google: {
    families: ['Orbitron']
  },
  active: measure
});

function measure() {
  $(function() {
    var c = document.querySelector("#tagCanvas");
    c.width = 0.98 * window.innerWidth;
    c.height = 0.98 * window.innerHeight;

    //Position "Hi, I'm Simon." correctly.
    var measureBefore = document.getElementById("measureBefore");
    var measureSimon = document.getElementById("measureSimon");
    headermarginleft = 50 - measureSimon.clientWidth / $("#tagCanvas").width() * 50 - measureBefore.clientWidth / $("#tagCanvas").width() * 100;
    $("#title-wrapper").css({"margin-left": headermarginleft + "vw"});

    drawNextCharacter(0);
  });
}

var delays = [70, 70, 70, 300, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
var typeString = "Hi, I'm Simon.";

function drawNextCharacter(i) {
  if (i < delays.length) {
    $("#spell").html(typeString.substring(0, i + 1));
    setTimeout(function() {
      drawNextCharacter(i + 1);
    }, delays[i]);
  } else {
    var leng = 300;
    $("#flickering").animate({color: "#000"}, leng)
                    .animate({color: "#fff"}, leng)
                    .animate({color: "#000"}, leng)
                    .animate({color: "#fff"}, leng)
                    .animate({color: "#000"}, leng);
    setTimeout(function(){
      $("#title-wrapper").html("<span class=\"fade\">Hi, I'm </span><span>Simon</span><span class=\"fade\">.</span>");
      $(".fade").animate({color: "#000"}, leng, "swing", draw);
    }, 2000);
  }
}
