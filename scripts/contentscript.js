
$(document).ready(function(){
  if ($('input[name=proceedToCheckout]').length > 0) {
    var theBox = $('input[name=proceedToCheckout]');
    var theFakeBox = $("<div id='theFakeButton'>aaaaaaaa</div>");

    theFakeBox.insertBefore("#gutterCartViewForm");

    /*
    $(document).append(theFakeBox);

    var pos = theBox.position();

    theFakeBox.position({
      my : "left top",
      at : "left top",
      of : theBox
    });

    theFakeBox.height(theBox.height());
    theFakeBox.width(theBox.width());
    */

    alert("!");

    //This is how we find the cost but we aren't quite there yet
    //var cost = alert($('.sc-price-sign').html());
  }
});
