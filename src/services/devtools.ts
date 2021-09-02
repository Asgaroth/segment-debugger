export function setupDevtools(
  callback: (request: chrome.devtools.network.Request) => void
) {
  chrome.devtools.network.onRequestFinished.addListener(callback);
}
