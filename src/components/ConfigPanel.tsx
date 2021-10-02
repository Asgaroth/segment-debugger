import { useRef } from 'react';
import { saveConfig } from '../services/localStore';
import { useDispatch, useStore } from '../store';

export function ConfigPanel() {
  const store = useStore();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  function onChange() {
    const value = inputRef?.current?.value;
    saveConfig({ ...store.config, customDomain: value });
    dispatch({ type: 'CUSTOM_DOMAIN', payload: value });
  }
  return (
    <div className="p-2">
      <label htmlFor="customDomain " className="text-xs">
        Custom domain
        <input
          defaultValue={store.config?.customDomain}
          ref={inputRef}
          placeholder="https://api.segment.io"
          onChange={onChange}
          type="text"
          id="customDomain"
          name="customDomain"
          className="p-1 ml-1 border border-gray-300 rounded shadow-sm "
        />
      </label>
    </div>
  );
}
