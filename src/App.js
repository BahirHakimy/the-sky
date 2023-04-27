import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Details from 'components/Details';
import FullForcast from 'components/FullForcast';
import Home from 'components/Home';

function App() {
  const routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: 'details/:lat/:lon', element: <Details /> },
    { path: 'forecast/:lat/:lon', element: <FullForcast /> },
    { path: '*', element: <Navigate to="/" /> },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
