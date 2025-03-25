import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import CommonLayout from './layouts/CommonLayout';
import Upload from './pages/Upload';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
