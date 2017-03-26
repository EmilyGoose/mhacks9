
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
      $('.sc-price-sign').html() + "</span>" +
      "<p>I would tell you how much longer your goal will take " +
      "but it's not implemented.</p>" +
      "<p>Are you sure you want to proceed?</p>" +
      "<button id='userIsSure'class='click' "+
      "onclick='var element = document.getElementById(\"theFakeBox\");" +
      "element.parentNode.removeChild(element);'>I'm sure!</button>" +
      "</div>"
    );

    theFakeBox.insertBefore("#gutterCartViewForm");

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
