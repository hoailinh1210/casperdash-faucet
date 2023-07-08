import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { Faucet } from './features/Faucet/routes/Faucet';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 * 365 * 100, // 100 years
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Faucet />
      <Toaster position="top-center" richColors closeButton />
    </QueryClientProvider>
  );
}

export default App;
