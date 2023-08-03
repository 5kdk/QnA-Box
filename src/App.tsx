import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Appshell from './components/pages/Appshell';

import Box from './components/pages/Box';
import BoxList from './components/pages/BoxList';
import CreateBox from './components/pages/CreateBox';
import Account from './components/pages/Account';
import EditAccount from './components/pages/EditAccount';
import User from './components/pages/User';
import Error from './components/pages/Error';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Appshell />,
    children: [
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'box',
        element: <BoxList />,
      },
      {
        path: 'box/:id',
        element: <Box />,
      },
      {
        path: 'box/create',
        element: <CreateBox />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'account/:target',
        element: <EditAccount />,
      },
      {
        path: 'user/:username',
        element: <User />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
