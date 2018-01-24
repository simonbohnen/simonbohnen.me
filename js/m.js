$(".link").each(function() {
  const fontsize = $(".normaltext").css("font-size");
  if($(this).height() > 1.2 * fontsize.substring(0, fontsize.length - 2)) {
    $(this).removeClass("lineLink");
    $(this).addClass("multilineLink");
  } else {
    $(this).removeClass("multilineLink");
    $(this).addClass("lineLink");
  }
});
function checkLinks() {
  $(".link").each(function() {
    const fontsize = $(this).css("font-size");
    if($(this).height() > 1.21 * fontsize.substring(0, fontsize.length - 2)) {
      $(this).removeClass("linelink");
      $(this).addClass("multilinelink");
    } else {
      $(this).removeClass("multilinelink");
      $(this).addClass("linelink");
    }
  });
}

var delays = [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
var stringparts = ["H",
                   "Hi",
                   "Hi,",
                   "Hi, I ",
                   "Hi, I'",
                   "Hi, I'm",
                   "Hi, I'm ",
                   "Hi, I'm <span style=\"white-space: nowrap\">C</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Ce</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Cem</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Cem-</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Cem-M</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Cem-Ma</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Cem-Mar</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Cem-Marv</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Cem-Marvi</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Cem-Marvin</span>",
                   "Hi, I'm <span style=\"white-space: nowrap\">Cem-Marvin.</span>"
                  ];
var flickerHTML = "<span id=\"flickering\">|</span>";

function drawNextCharacter(i) {
  if (i < delays.length) {
    $("#spell").html(stringparts[i]);
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
      $("#flickering").html("");
    }, 1600);
  }
}

$(document).ready(function() {
  $('div.fade').fadeIn(750).removeClass('div.fade');
  window.onload = checkLinks();
  window.onresize = checkLinks();


  //Position "Hi, I'm Cem-Marvin." correctly.
  var test = $("#always-hidden");
  test.css({"font-size": "7vw"});
  headermarginleft = 50 - (test.width() / $("#headerdiv").width()) * 50;
  $("#name").css({"margin-left": headermarginleft + "vw"});
  test.css({"display": "none"});
  console.log("text.width(): " + test.width() + " $(\"#headerdiv.width()\"): " + $("#headerdiv").width());

  setTimeout(function() {
    drawNextCharacter(0);
  }, 570);
});
