import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/GlobalStyle';
import { Account, Appshell, Box, BoxList, CreateBox, EditAccount, Error, Root, Signin, Signup, User } from './pages';
import { AuthenticationGuard, ConditionalRouteGuard } from './guards';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
        path: '/',
        element: <Root />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'account',
        element: <AuthenticationGuard redirectTo="/signin" element={<Account />} />,
      },
      {
        path: 'account/:target',
        element: (
          <ConditionalRouteGuard target="target" access={['profile', 'password']} redirectTo="/error">
            <AuthenticationGuard redirectTo="/signin" element={<EditAccount />} />
          </ConditionalRouteGuard>
        ),
      },
      {
        path: 'user/:uid',
        element: <User />,
      },
      {
        path: 'box',
        element: <AuthenticationGuard redirectTo="/signin" element={<BoxList />} />,
      },
      {
        path: 'box/:id',
        element: <Box />,
      },
      {
        path: 'box/create',
        element: <AuthenticationGuard redirectTo="/signin" element={<CreateBox />} />,
      },
      {
        path: '*',
        element: <Error status={404} message="요청하신 페이지를 찾을 수 없습니다" />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
