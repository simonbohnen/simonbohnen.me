function checkLinks() {
  $(".link").each(function() {
    /*console.log("Checked Link: " + $(this).html());
    console.log("Height: " + $(this).height());*/
    const fontsize = $(this).css("font-size");
    if($(this).height() > 1.3 * parseFloat(fontsize.substring(0, fontsize.length - 2))) {
      $(this).removeClass("linelink");
      $(this).addClass("multilinelink");
    } else {
      $(this).removeClass("multilinelink");
      $(this).addClass("linelink");
    }
  });
}

var delays = [70, 70, 70, 300, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70];
var stringparts = ["H",
                   "Hi",
                   "Hi,",
                   "Hi, ",
                   "Hi, I",
                   "Hi, I'",
                   "Hi, I'm",
                   "Hi, I'm ",
                   "Hi, I'm M",
                   "Hi, I'm Ma",
                   "Hi, I'm Mar",
                   "Hi, I'm Marv",
                   "Hi, I'm Marvi",
                   "Hi, I'm Marvin",
                   "Hi, I'm Marvin!"
                  ];
var flickerHTML = "<span id=\"flickering\">|</span>";

/*

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

*/

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

let threshold = 50;

function fadeIn() {
  //console.log($(window).scrollTop());
  var viewPortSize = $(window).height();
  $(".fade").each(function() {
    //console.log(this.tagName);
    var dies = $(this);
    if ($(window).scrollTop() + viewPortSize - threshold >= dies.position().top) {
        setTimeout(function() {
          dies.css('visibility', 'visible').hide().fadeIn();
        }, 100);
        dies.removeClass('fade');
    }
  });
}

$(document).ready(function() {
  //$('div.fade').fadeIn(750).removeClass('div.fade');
  setTimeout(checkLinks, 100);
  $(window).resize(checkLinks);
  //console.log('loaded');

  //Position "Hi, I'm Marvin." correctly.
  var test = $("#always-hidden");
  headermarginleft = 45 - (test.width() / $("#content").width()) * 45;
  $("#name").css({"margin-left": headermarginleft + "vw"});
  console.log("text.width(): " + test.width()); // + " $(\"#headerdiv.width()\"): " + $("#headerdiv").width()
  test.html('');
});

$(window).ready(function() {
  $("#name").ready(function() {
    $("#flickering").html("|");
    drawNextCharacter(0);
  });

  setTimeout(fadeIn, 100);
  $(window).scroll(fadeIn);
});
