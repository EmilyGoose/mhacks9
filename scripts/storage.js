function save(key, value) {
  chrome.storage.sync.set({key: value}, function() {
    return true;
  });
}

function retrieve(key) {
  chrome.storage.sync.get(key, function(items) {
    return items;
  });
}
