// When the page loads, get saved preferences and the most recent income info
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get(['preferences', 'lastIncome'], function (items) {
    const preferences = items.preferences;
    // If this is not your first run, the welcome header is hidden and inputs are pre-filled
    if (preferences !== undefined) {
      document.getElementById('message').remove();
      document.getElementById('name').value = preferences.name;
      document.getElementById('income').value = items.lastIncome.value;
      document.getElementById('income-period').value = items.lastIncome.period;
      document.getElementById('notifications-allowed').checked = preferences['notifications-allowed'];
    }
  });
}, false);

function daysBetween(day1, day2) {
  return ((day2 - day1) / (1000*60*60*24));
}

// This is called by #submitForm
function saveChanges() {
  // Stop the form from submitting
  event.preventDefault();
  // We need to preemptively get incomeHistory and lastIncome to avoid adding duplicates to history
  chrome.storage.sync.get(['incomeHistory', 'lastIncome'], function (items) {
    let history = items.incomeHistory;
    let lastIncome = items.lastIncome;
    var calcTotalIncome = items.calculatedTotalIncome;

    if (true) {//lastIncome === undefined) {
      //Create empty last income for first run
      lastIncome = {
        created : Date.now(),
        period : 'day',
        value : 0
      }
    }

    if (calcTotalIncome === undefined) {
      calcTotalIncome = 0;
    }

    if (history === undefined) {
      history = [];
    }

   calcTotalIncome += daysBetween(lastIncome.created, Date.now()) *  parseInt(lastIncome.value);

   console.log(daysBetween(lastIncome.created, Date.now()));

    // Check to see if you didn't change your income data
    if (lastIncome !== undefined && lastIncome.period == document.getElementById('income-period').value && lastIncome.value == document.getElementById('income').value) {
      // Get a value saved in a form and save it using the Chrome extension storage API.
      chrome.storage.sync.set({
        preferences: {
          name: document.getElementById('name').value,
          "notifications-allowed": document.getElementById('notifications-allowed').checked
        }
      });
    } else {
      // If you did, it will be appended to incomeHistory and lastIncome will be updated
      history.push({
        created: moment(),
        period: document.getElementById('income-period').value,
        value: document.getElementById('income').value
      });
      // Get a value saved in a form and save it using the Chrome extension storage API.

      chrome.storage.sync.set({
        calculatedTotalIncome: calcTotalIncome, // Misha, write a function to calculate the total or pass in a variable or something
        lastIncome: {
          created: moment(),
          period: document.getElementById('income-period').value,
          value: document.getElementById('income').value
        },
        incomeHistory: history,
        preferences: {
          name: document.getElementById('name').value,
          "notifications-allowed": document.getElementById('notifications-allowed').checked
        }
      });
    }
  });

  alert("Saved!");
}

// Add the click listener to #submitForm in JS
document.getElementById('submitForm').addEventListener('click', saveChanges, false)
