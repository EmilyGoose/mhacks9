document.addEventListener('DOMContentLoaded', function (e) {
  chrome.storage.sync.get(['lastIncome', 'preferences'], function (items) {
    const income = items.lastIncome;
    if (items.preferences === undefined) {
      items.preferences = { name: undefined };
    }
    const name = items.preferences.name;

    document.getElementById('name').innerHTML = name;
    document.getElementById('income').innerHTML = income.value;
  });
});
