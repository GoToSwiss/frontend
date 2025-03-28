import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Home from './pages/Home';
import CommonLayout from './layouts/CommonLayout';
import Upload from './pages/Upload';
import GoogleMapContainer from './features/map/GoogleMapContainer';
import queryClient from './services/TanstackQueryStore';

async function enableMocking() {
  if (import.meta.env.VITE_NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browsers');
  worker.start();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'upload',
        element: <Upload />,
      },
      {
        path: 'map',
        element: <GoogleMapContainer />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    enableMocking();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
