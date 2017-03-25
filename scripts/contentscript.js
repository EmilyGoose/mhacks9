
$(document).ready(function(){
  if ($('input[name=proceedToCheckout]').length > 0) {
    var cost = alert($('.sc-price-sign').html());
    modal.open({content: "This is a checkout page. Stop buying things!"});
  }
});
