let whitelist = [];

chrome.runtime.onInstalled.addListener(() => {
  fetch(chrome.runtime.getURL('whitelist.txt'))
    .then(response => response.text())
    .then(data => {
      whitelist = data.split('\n').map(url => url.trim()).filter(url => url.length > 0);
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkWhitelist') {
    sendResponse(whitelist);
  }
});
