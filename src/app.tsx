import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider';
import { queryClient } from './api/queryOptions';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadDelay: 100,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('app')!;

// eslint-disable-next-line react-refresh/only-export-components
const InnerApp = () => {
  return <RouterProvider router={router} />;
};

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <InnerApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
