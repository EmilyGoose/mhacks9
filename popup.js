document.addEventListener('DOMContentLoaded', function() {
  var preferences = document.getElementById('preferences');
  preferences.addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  }, false);
}, false);
