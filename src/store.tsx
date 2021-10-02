import React, { useContext, useEffect, useReducer } from 'react';
import { setupDevtools } from './services/devtools';
import {
  isRequestValid,
  processRequest,
  RequestEntry,
} from './services/processRequest';

export type ConfigOptions = {
  customDomain?: string;
};

type Store = {
  config?: ConfigOptions;
  selectedRequest?: RequestEntry;
  requests: Record<string, any> | undefined;
};
const StoreContext = React.createContext<Store>({ requests: undefined });
const DispatchContext = React.createContext<React.Dispatch<ReducerAction>>(
  () => {}
);

type ReducerAction = { type: string; payload?: any };

let nextID = 0;

function makeEntry(request: any) {
  return { ...request, key: `request-${nextID++}` };
}

function storeReducer(state: Store, action: ReducerAction): Store {
  switch (action.type) {
    case 'ADD_EVENT': {
      const request = processRequest(
        action.payload,
        state.config?.customDomain
      );
      if (request) {
        const entry = makeEntry(request);
        return {
          ...state,
          requests: { ...state.requests, [entry.key]: entry },
        };
      }
      return state;
    }
    case 'CLEAR': {
      return { requests: undefined, selectedRequest: undefined };
    }

    case 'SELECT': {
      return { ...state, selectedRequest: { ...action.payload } };
    }
    case 'CUSTOM_DOMAIN': {
      return {
        ...state,
        config: { ...state.config, customDomain: action.payload },
      };
    }
    default:
      console.error(action);
      throw new Error(`Unknown action type ${action.type}`);
  }
}

function StoreProvider({ initialState, ...props }: any) {
  const [store, dispatch] = useReducer(storeReducer, initialState);
  const customDomain = store.config?.customDomain;

  useEffect(() => {
    setupDevtools((request) => {
      if (isRequestValid(request, customDomain)) {
        dispatch({ type: 'ADD_EVENT', payload: request });
      }
    });
  }, [customDomain]);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={store} {...props} />
    </DispatchContext.Provider>
  );
}

function useStore() {
  return useContext(StoreContext);
}
function useDispatch() {
  return useContext(DispatchContext);
}
export { StoreProvider, useStore, useDispatch };
