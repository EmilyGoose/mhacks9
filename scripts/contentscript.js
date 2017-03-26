function daysBetween(day1, day2) {
  return Math.round((day2 - day1) / (1000*60*60*24));
}

$(document).ready(function(){
  if ($('input[name=proceedToCheckout]').length > 0) {
    //Runs on the cart page and asks user if they're sure we want to checkout
    var theBox = $('input[name=proceedToCheckout]');
    var theFakeBox = $(
      "<div id='theFakeBox'>" +
      "<div id='brand'>" +
      "<img src='" + chrome.extension.getURL('icons/icon128.png') + "' alt='3-Click Ordering' />" +
      "<h1>STOP!</h1>" +
      "</div>" +
      "<p>You are about to spend " +
      "<span class='money'>" +
      $('.sc-price-sign').html() + "</span></p>" +
      //Here is where the days left will be inserted
      "<p id='proceedWithBuy3click'>Are you sure you want to proceed?</p>" +
      "<button id='userIsSure'class='click' "+
      "onclick='var element = document.getElementById(\"theFakeBox\");" +
      "element.parentNode.removeChild(element);'>I'm sure!</button>" +
      "</div>"
    );

    theFakeBox.insertBefore("#gutterCartViewForm");

    chrome.storage.sync.get(['lastIncome', 'calculatedTotalIncome', 'goal'], function (items) {
      let lastIncome = items.lastIncome;
      let calcTotalIncome = items.calculatedTotalIncome;
      let goal = items.goal;

      let itemPrice = parseFloat($('.sc-price-sign').html().substring(1));

      let saved = calcTotalIncome + daysBetween(lastIncome.created, Date.now()) *  parseInt(lastIncome.value);

      let newSaved = (saved - itemPrice);

      let price = parseFloat(goal.price.substring(1));

      let daysLeft = Math.round((price - saved)/lastIncome.value);

      let newDaysLeft = Math.round((price - newSaved)/lastIncome.value);

      let string = $(
        "<p id='goalInfo'>" +
        "Your goal will currently take " +
        daysLeft +
        " days</p>" +
        "<p>" +
        "With this purchase, it will take " +
        (newDaysLeft - daysLeft) +
        " more days.</p>"
      );

      string.insertBefore($("#proceedWithBuy3click"));

    });

  } else if ($('#add-to-cart-button').length > 0) {
    //Runs on the item page and offers to set it as a goal

    var submitButton = $('#add-to-cart-button');
    var pageUrl = $(location).attr('href');

    var productID = pageUrl.split("/")[5];
    var productName = jQuery.trim($("#productTitle").html());
    var productPrice = $("#priceblock_ourprice").html();

    var setGoalButton = $("<button id='setGoalButton' class='click'><img src='"+chrome.extension.getURL("icons/icon.png")+"' alt='Icon' height='15' width='15'>Set as goal</button>");

    setGoalButton.insertAfter("#title_feature_div");

    document.getElementById('setGoalButton').addEventListener('click', function(event) {
      chrome.storage.sync.set({goal : {
        type : "item", //Can be "item" or "cash"
        name : productName,
        id : productID,
        price : productPrice
      }});

      alert("Your goal of '" + productName + "' for " + productPrice + " has been saved.");

    });

  }
});
