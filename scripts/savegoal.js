document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get('preferences', function (items) {
    const preferences = items.preferences;
    if (preferences !== undefined) {
      document.getElementById('initial').remove();
      document.getElementById('name').value = preferences.name;
      document.getElementById('mom').value = preferences.mom;
      document.getElementById('income').value = preferences.income;
      document.getElementById('can-we-talk-to-your-mom').checked = preferences['can-we-talk-to-your-mom'];
      document.getElementById('notifications-allowed').checked = preferences['notifications-allowed'];
    }
  });
}, false);

function saveChanges() {
  // Get a value saved in a form and save it using the Chrome extension storage API.
  chrome.storage.sync.set({ preferences: { name: document.getElementById('name').value, mom: document.getElementById('mom').value, income: document.getElementById('income').value, name: document.getElementById('name').value, "can-we-talk-to-your-mom": document.getElementById('can-we-talk-to-your-mom').checked, "notifications-allowed": document.getElementById('notifications-allowed').checked }});
}

document.getElementById('submitForm').addEventListener('click', saveChanges, false)
