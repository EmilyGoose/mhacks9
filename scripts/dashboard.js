function daysBetween(day1, day2) {
  return Math.round((day2 - day1) / (1000*60*60*24));
}

function daysUntilReached() {
  chrome.storage.sync.get(['lastIncome', 'calculatedTotalIncome', 'goal'], function (items) {
    let lastIncome = items.lastIncome;
    let calcTotalIncome = items.calculatedTotalIncome;
    let goal = items.goal;

    let saved = calcTotalIncome + daysBetween(lastIncome.created, Date.now()) *  parseInt(lastIncome.value);

    let price = parseFloat(goal.price.substring(1));

    let daysLeft = Math.round((price - saved)/lastIncome.value);

    if (daysLeft > 0) {
      document.getElementById('message').innerHTML = "Hey there, your goal, <a target='_blank' href='https://www.amazon.com/dp/item/" + goal.id + "'>" + goal.name + "</a>, will be reached in " + daysLeft + " days!";
    } else {
      document.getElementById('message').innerHTML = "Hey there, your goal, <a target='_blank' href='https://www.amazon.com/dp/item/" + goal.id + "'>" + goal.name + "</a>, has been reached!";
    }
  });
}


document.addEventListener('DOMContentLoaded', function (e) {
  chrome.storage.sync.get(['goal', 'preferences'], function (items) {
    const goal = items.goal;
    if (items.preferences === undefined) {
      items.preferences = { name: undefined };
    }
    const name = items.preferences.name;

    daysUntilReached();

    if (goal === undefined) {
      if (name === undefined) {
        document.getElementById('message').innerHTML = "Hey there, you should add a goal!";
      } else {
        document.getElementById('message').innerHTML = "Hey " + name + ", you should add a goal!";
        console.log(name);
      }
    } else {
      if (goal.type == "item") {
        if (name === undefined) {
          document.getElementById('message').innerHTML = "Hey there, your goal, <a target='_blank' href='https://www.amazon.com/dp/item/" + goal.id + "'>" + goal.name + "</a>, will be reached in some days!";
        } else {
          document.getElementById('message').innerHTML = "Hey " + name + ", your goal, <a target='_blank' href='https://www.amazon.com/dp/item/" + goal.id + "'>" + goal.name + "</a> will be reached in some days!";
        }
      } else {
        if (name === undefined) {
          document.getElementById('message').innerHTML = "Hey there, your goal, " + goal.name + "</a>, will be reached in " + daysUntilReached + " days!";
        } else {
          document.getElementById('message').innerHTML = "Hey " + name + ", your goal, " + goal.name + " will be reached in " + daysUntilReached + " days!";
        }
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
