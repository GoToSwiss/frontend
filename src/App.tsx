import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import CommonLayout from './layouts/CommonLayout';
import Upload from './pages/Upload';
import queryClient from './services/TanstackQueryStore';
import GoogleMap from './pages/GoogleMap';
import Login from './pages/Login';
import LoadingAuth from './pages/LoadingAuth';
import NotFound from './pages/NotFound';
import MyPage from './pages/MyPage';
import MapLayout from './layouts/MapLayout';
import ProtectedRoute from './components/ProtectedRoute';

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
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'upload',
        element: (
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        ),
      },

      {
        path: 'mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'loadingAuth',
    element: <LoadingAuth />,
  },
  {
    path: 'map',
    element: (
      <MapLayout>
        <GoogleMap />
      </MapLayout>
    ),
  },
]);

function App() {
  useEffect(() => {
    enableMocking();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
