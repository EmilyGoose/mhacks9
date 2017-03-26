document.addEventListener('DOMContentLoaded', function (e) {
  chrome.storage.sync.get(['goal', 'preferences'], function (items) {
    const goal = items.goal;
    const name = items.preferences.name;
    const daysUntilReached = "Misha, pls implement this feature!!!"; // Misha, please implement this feature
    if (goal === undefined) {
      if (name === undefined) {
        document.getElementById('message').innerHTML = "Hey there, you should add a goal!";
      } else {
        document.getElementById('message').innerHTML = "Hey " + name + ", you should add a goal!";
      }
    } else {
      if (name === undefined) {
        document.getElementById('message').innerHTML = "Hey there, your goal, " + goal.name + " will be reached in " + daysUntilReached + " days!";
      } else {
        document.getElementById('message').innerHTML = "Hey " + name + ", your goal, " + goal.name + " will be reached in " + daysUntilReached + " days!";
      }
    }
  });

  document.getElementById('cashGoalButton').addEventListener('click', function (e) {
    document.getElementById('cashGoalForm').className = "visible";
  });

  document.getElementById('submitForm').addEventListener('click', function (e) {
    e.preventDefault();
    chrome.storage.sync.set({
      goal : {
        type : "cash", //Can be "item" or "cash"
        name : document.getElementById('name').value,
        price : "$" + document.getElementById('price').value
      }
    });
    document.getElementById('cashGoalForm').className = "";
    alert("Your goal of '" + document.getElementById('name').value + "' for $" + document.getElementById('price').value + " has been saved.")
  });
});
