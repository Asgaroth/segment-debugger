export function setupDevtools(
  callback: (request: chrome.devtools.network.Request) => void
) {
  if (chrome?.devtools?.network) {
    chrome.devtools.network.onRequestFinished.addListener(callback);
  } else if (process.env.NODE_ENV === 'development') {
    const testData = require('../testdata.json');
    testData.forEach((request: any) => {
      callback(request);
    });
  }
}
