import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Details from 'components/Details';
import FullForcast from 'components/FullForcast';
import Home from 'components/Home';

function App() {
  const routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: 'details/:city', element: <Details /> },
    { path: 'forecast', element: <FullForcast /> },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
