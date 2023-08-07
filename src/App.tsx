import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyle';
import {
  Account,
  Appshell,
  Box,
  BoxList,
  CreateBox,
  EditAccount,
  Error,
  Signin,
  Signup,
  User,
} from './components/pages';
import AuthenticationGuard from './guards/AuthenticationGuard';

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
        // element: <BoxList />,
        element: <AuthenticationGuard redirectTo="/signin" element={<BoxList />} />,
      },
      {
        path: 'box/:id',
        element: <Box />,
      },
      {
        path: 'box/create',
        // element: <CreateBox />,
        element: <AuthenticationGuard redirectTo="/signin" element={<CreateBox />} />,
      },
      {
        path: 'account',
        element: <Account />,
        // element: <AuthenticationGuard redirectTo="/signin" element={<Account />} />,
      },
      {
        path: 'account/:target',
        element: <EditAccount />,
        // element: <AuthenticationGuard redirectTo="/signin" element={<EditAccount />} />,
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
