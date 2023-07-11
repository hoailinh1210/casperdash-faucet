import {
  CasperDashConnector,
  CasperProvider,
  createClient,
} from '@casperdash/usewallet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { Faucet } from './features/Faucet/routes/Faucet';

const client = createClient({
  connectors: [new CasperDashConnector()],
  autoConnect: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 * 365 * 100, // 100 years
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CasperProvider client={client}>
        <Faucet />
        <Toaster position="top-center" richColors closeButton />
      </CasperProvider>
    </QueryClientProvider>
  );
}

export default App;
