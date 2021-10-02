const SEGMENT_DOMAIN = 'https://api.segment.io';
export function isRequestValid(
  requestObject: chrome.devtools.network.Request,
  domain = SEGMENT_DOMAIN
) {
  if (requestObject && requestObject.request && requestObject.request.url) {
    // https://api.segment.io/v1/m requests dont matter
    return (
      requestObject.request.url.startsWith(`${domain}/v1/t`) ||
      requestObject.request.url.startsWith(`${domain}/v1/i`) ||
      requestObject.request.url.startsWith(`${domain}/v1/p`)
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
  properties: Record<string, string>,
  domain: string
): { type: EntryType; name: string } {
  if (requestObject.request.url === `${domain}/v1/t`) {
    return { type: 'track', name: properties.event };
  } else if (requestObject.request.url === `${domain}/v1/i`) {
    return { type: 'identify', name: 'Identify' };
  } else if (requestObject.request.url === `${domain}/v1/p`) {
    return { type: 'pageLoad', name: 'Page loaded' };
  } else {
    return { type: 'unknown', name: 'unknown' };
  }
}

export function processRequest(
  requestObject: chrome.devtools.network.Request,
  domain = SEGMENT_DOMAIN
): RequestEntry | undefined {
  if (isRequestValid(requestObject, domain)) {
    try {
      const data = JSON.parse(requestObject.request!.postData!.text!);
      const request: RequestEntry = {
        ...eventMeta(requestObject, data, domain),
        data,
      };
      return request;
    } catch (error) {
      console.error('error', error);
    }
  }
}
