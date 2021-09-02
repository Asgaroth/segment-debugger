import { StoreProvider } from './store';
import { RequestTable } from './components/RequestTable';

function App() {
  return (
    <StoreProvider>
      <RequestTable />
    </StoreProvider>
  );
}

export default App;
