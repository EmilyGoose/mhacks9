function daysBetween(day1, day2) {
  return Math.round((day2 - day1) / (1000*60*60*24));
}

document.addEventListener('DOMContentLoaded', function() {
  var preferences = document.getElementById('preferences');
  preferences.addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  }, false);

  chrome.storage.sync.get(['lastIncome', 'calculatedTotalIncome', 'goal'], function (items) {
    let lastIncome = items.lastIncome;
    let calcTotalIncome = items.calculatedTotalIncome;
    let goal = items.goal;

    let saved = calcTotalIncome + daysBetween(lastIncome.created, Date.now()) *  parseInt(lastIncome.value);

    let price = parseFloat(goal.price.substring(1));

    let daysLeft = Math.round((price - saved)/lastIncome.value);

    let string = $(
      "<div id='goalInfo'> Saved: $" +
      saved  +
      "</br>" +
      "Goal: " +
      goal.price +
      "</br>" +
      "Goal in " +
      daysLeft +
      " days</div>"
    );

    string.insertAfter($("#brand"));

  });
}, false);
