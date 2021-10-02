import { ConfigOptions } from '../store';

const CACHE_KEY = 'segment-config';

export function loadConfig() {
  try {
    const config = localStorage.getItem(CACHE_KEY);
    if (config === null) {
      return undefined;
    }
    return JSON.parse(config);
  } catch (e) {
    return undefined;
  }
}

export function saveConfig(config: ConfigOptions) {
  try {
    const state = JSON.stringify(config);
    localStorage.setItem(CACHE_KEY, state);
  } catch (e) {
    // not sure
  }
}
