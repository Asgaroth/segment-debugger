export function isRequestValid(requestObject: chrome.devtools.network.Request) {
  if (requestObject && requestObject.request && requestObject.request.url) {
    // https://api.segment.io/v1/m requests dont matter
    return (
      requestObject.request.url.startsWith('https://api.segment.io/v1/t') ||
      requestObject.request.url.startsWith('https://api.segment.io/v1/i') ||
      requestObject.request.url.startsWith('https://api.segment.io/v1/p')
    );
  }
  return false;
}

export type EntryType = 'track' | 'identify' | 'pageLoad' | 'unknown';
export type RequestEntry = {
  key?: string;
  type: EntryType;
  name: string;
  data: Record<string, string>;
};

function eventMeta(
  requestObject: chrome.devtools.network.Request,
  properties: Record<string, string>
): { type: EntryType; name: string } {
  if (requestObject.request.url === 'https://api.segment.io/v1/t') {
    return { type: 'track', name: properties.event };
  } else if (requestObject.request.url === 'https://api.segment.io/v1/i') {
    return { type: 'identify', name: 'Identify' };
  } else if (requestObject.request.url === 'https://api.segment.io/v1/p') {
    return { type: 'pageLoad', name: 'Page loaded' };
  } else {
    return { type: 'unknown', name: 'unknown' };
  }
}

export function processRequest(
  requestObject: chrome.devtools.network.Request
): RequestEntry | undefined {
  if (isRequestValid(requestObject)) {
    try {
      const data = JSON.parse(requestObject.request!.postData!.text!);
      const request: RequestEntry = {
        ...eventMeta(requestObject, data),
        data,
      };
      return request;
    } catch (error) {
      console.error('error', error);
    }
  }
}
