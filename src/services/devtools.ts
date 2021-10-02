type RequestHandler = (request: chrome.devtools.network.Request) => void;
let lastCallback: RequestHandler;
export function setupDevtools(callback: RequestHandler) {
  if (chrome?.devtools?.network) {
    if (lastCallback) {
      chrome.devtools.network.onRequestFinished.removeListener(lastCallback);
    }
    lastCallback = callback;
    chrome.devtools.network.onRequestFinished.addListener(lastCallback);
  } else if (process.env.NODE_ENV === 'development') {
    const testData = require('../testdata.json');
    testData.forEach((request: any) => {
      callback(request);
    });
  }
}
