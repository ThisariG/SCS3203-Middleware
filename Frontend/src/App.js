// routes
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
// ----------------------------------------------------------------------

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
