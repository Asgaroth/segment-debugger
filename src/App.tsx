import { StoreProvider } from './store';
import { RequestTable } from './components/RequestTable';
import { ConfigBar } from './components/ConfigBar';
import { loadConfig } from './services/localStore';

const initialState = { config: loadConfig() };

function App() {
  return (
    <StoreProvider initialState={initialState}>
      <div className="divide-y divide-gray-300">
        <ConfigBar />
        <RequestTable />
      </div>
    </StoreProvider>
  );
}

export default App;
