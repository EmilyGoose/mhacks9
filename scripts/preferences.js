document.addEventListener('DOMContentLoaded', function() {
  var preferences = document.getElementById('saveInfo');
  var nameBox = document.getElementById('name');
  preferences.addEventListener('click', function(event) {
    event.preventDefault();
    chrome.storage.sync.set({'name': $('#name').val() }, function() {
      alert("saved");
    });
  }, false);

  chrome.storage.sync.get('name', function(items) {
    alert(items['name']);
  });

}, false);
