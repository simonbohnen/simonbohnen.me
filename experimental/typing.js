WebFont.load({
  google: {
    families: ['Orbitron']
  },
  active: init
});

let beforeWidth, simonWidth;

$(window).resize(positionTitle);

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

    drawNextCharacter(0);
  });
}

const delays = [70, 70, 70, 300, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
const typeString = "Hi, I'm Simon.";

function drawNextCharacter(i) {
  if (i < delays.length) {
    $("#spell").html(typeString.substring(0, i + 1));
    setTimeout(function() {
      drawNextCharacter(i + 1);
    }, delays[i]);
  } else {
      const leng = 300;
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
