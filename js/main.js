const delays = [100, 100, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
let writeString;

function drawNextCharacter(i) {
  if (i < writeString.length) {
    $('#spell').html(writeString.substring(0, i + 1));
    setTimeout(() => {
      drawNextCharacter(i + 1);
    }, delays[i]);
  } else {
    const leng = 300;
    $('#flickering').animate({ color: '#000' }, leng)
      .animate({ color: '#fff' }, leng)
      .animate({ color: '#000' }, leng)
      .animate({ color: '#fff' }, leng)
      .animate({ color: '#000' }, leng)
      .animate({ color: '#fff' }, leng);
    setTimeout(() => {
      $('#flickering').html('');
    }, 2000);
  }
}

$(document).ready(() => {
  const birth = new Date('2000-10-12');
  const today = new Date();
  const difference = today - birth;
  const age = new Date(difference).getFullYear() - 1970;
  const span = document.getElementById('age');
  span.innerHTML = age.toString();

  if (window.location.href.includes('/de')) {
    writeString = 'Hi, ich bin Simon.';
  } else {
    writeString = "Hi, I'm Simon.";
  }

  // Position "Hi, I'm Simon." correctly.
  const test = $('#always-hidden');
  const headermarginleft = 45 - (test.width() / $('#content').width()) * 45;
  $('#name').css({ 'margin-left': `${headermarginleft}vw` });
  test.html('');
});

$(window).ready(() => {
  $('#name').ready(() => {
    $('#flickering').html('|');
    drawNextCharacter(0);
  });
});
