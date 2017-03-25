document.addEventListener('DOMContentLoaded', function() {
  var dashboard = document.getElementById('dasboard');
  var profile = document.getElementById('profile');
  var preferences = document.getElementById('preferences');
  dasboard.addEventListener('click', function() {
    console.log("Test");
  }, false);
  profile.addEventListener('click', function() {
    console.log("Test");
  }, false);
  preferences.addEventListener('click', function() {
    console.log("Test");
    chrome.runtime.openOptionsPage();
  }, false);
}, false);
