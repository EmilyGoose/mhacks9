function save(key, value) {
  chrome.storage.StorageArea.set({key: value}, function() {
    return true;
  });
}

function retrieve(key) {
  chrome.storage.StorageArea.get(key, function(items) {
    return items;
  });
}
