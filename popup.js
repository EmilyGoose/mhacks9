document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('action');
  button.addEventListener('click', function() {
    console.log("Test");
    chrome.runtime.openOptionsPage();
  }, false);
}, false);
