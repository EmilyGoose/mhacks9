
$(document).ready(function(){
  if ($('input[name=proceedToCheckout]').length > 0) {
    var theBox = $('input[name=proceedToCheckout]');
    var theFakeBox = $(
      "<div id='theFakeBox'>" +
      "<h1>STOP!</h1>" +
      "<p>You are about to spend " +
      "<span class='money'>" +
      $('.sc-price-sign').html() + "</span>" +
      "<p>I would tell you how much longer your goal will take " +
      "but it's not implemented.</p>" +
      "<p>Are you sure?</p>" +
      "<button id='userIsSure' " +
      "onclick='var element = document.getElementById(\"theFakeBox\");" +
      "element.parentNode.removeChild(element);'>I'm sure!</button>" +
      "</div>"
    );

    theFakeBox.insertBefore("#gutterCartViewForm");

  }
});
