import React, { useContext, useEffect, useReducer, useState } from 'react';
import { setupDevtools } from './services/devtools';
import {
  isRequestValid,
  processRequest,
  RequestEntry,
} from './services/processRequest';

type Store = {
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
      const request = processRequest(action.payload);
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
    default:
      console.error(action);
      throw new Error(`Unknown action type ${action.type}`);
  }
}

function StoreProvider({ initialState, ...props }: any) {
  const [store, dispatch] = useReducer(storeReducer, {
    requests: initialState,
    // selectedRequest: initialState.first
  });
  // console.log(store);

  useEffect(() => {
    setupDevtools((request) => {
      if (isRequestValid(request)) {
        dispatch({ type: 'ADD_EVENT', payload: request });
      }
    });
  }, []);
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
