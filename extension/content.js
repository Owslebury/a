chrome.runtime.sendMessage({ action: 'checkWhitelist' }, (whitelist) => {
  const currentUrl = window.location.hostname;

  // Normalize the URL for better comparison
  const normalizeUrl = (url) => url.replace(/^www\./, '').toLowerCase();

  const isWhitelisted = whitelist.some(whitelistedUrl => {
    // Normalize both the current URL and the whitelist URL for accurate matching
    return normalizeUrl(currentUrl) === normalizeUrl(whitelistedUrl);
  });

  if (!isWhitelisted) {
    window.location.replace('about:blank'); // Block the page if not in the whitelist
  }
});
