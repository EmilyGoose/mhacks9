// When the page loads, get saved preferences and the most recent income info
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get(['preferences', 'lastIncome'], function (items) {
    const preferences = items.preferences;
    // If this is not your first run, the welcome header is hidden and inputs are pre-filled
    if (preferences !== undefined) {
      document.getElementById('message').remove();
      document.getElementById('name').value = preferences.name;
      document.getElementById('mom').value = preferences.mom;
      document.getElementById('income').value = items.lastIncome.value;
      document.getElementById('income-period').value = items.lastIncome.period;
      document.getElementById('can-we-talk-to-your-mom').checked = preferences['can-we-talk-to-your-mom'];
      document.getElementById('notifications-allowed').checked = preferences['notifications-allowed'];
    }
  });
}, false);

// This is called by #submitForm
function saveChanges() {
  // Stop the form from submitting
  event.preventDefault();
  // We need to preemptively get incomeHistory and lastIncome to avoid adding duplicates to history
  chrome.storage.sync.get(['incomeHistory', 'lastIncome'], function (items) {
    const history = items.incomeHistory;
    const lastIncome = items.lastIncome;
    // Check to see if you didn't change your income data
    if (lastIncome.period == document.getElementById('income-period').value && lastIncome.value == document.getElementById('income').value) {
      // Get a value saved in a form and save it using the Chrome extension storage API.
      chrome.storage.sync.set({
        preferences: {
          name: document.getElementById('name').value,
          mom: document.getElementById('mom').value,
          name: document.getElementById('name').value,
          "can-we-talk-to-your-mom": document.getElementById('can-we-talk-to-your-mom').checked,
          "notifications-allowed": document.getElementById('notifications-allowed').checked
        }
      });
    } else {
      // If you did, it will be appended to incomeHistory and lastIncome will be updated
      history.append({
        created: moment(),
        period: document.getElementById('income-period').value,
        value: document.getElementById('income').value
      });
      // Get a value saved in a form and save it using the Chrome extension storage API.
      chrome.storage.sync.set({
        calculatedTotalIncome: 0, // Misha, write a function to calculate the total or pass in a variable or something
        lastIncome: {
          created: moment(),
          period: document.getElementById('income-period').value,
          value: document.getElementById('income').value
        },
        incomeHistory: history,
        preferences: {
          name: document.getElementById('name').value,
          mom: document.getElementById('mom').value,
          name: document.getElementById('name').value,
          "can-we-talk-to-your-mom": document.getElementById('can-we-talk-to-your-mom').checked,
          "notifications-allowed": document.getElementById('notifications-allowed').checked
        }
      });
    }
  });
}

// Add the click listener to #submitForm in JS
document.getElementById('submitForm').addEventListener('click', saveChanges, false)
