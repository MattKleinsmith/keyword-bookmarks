chrome.omnibox.onInputEntered.addListener(async (text) => {
  // Use chrome.storage to retrieve the URL associated with the entered keyword
  chrome.storage.sync.get([text], function(result) {
    if (result[text]) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Navigate to the stored URL in the current tab
        chrome.tabs.update(tabs[0].id, { url: result[text] });
      });
    }
  });
});
