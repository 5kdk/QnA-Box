import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Appshell from './components/pages/Appshell';
import Qna from './components/pages/Qna';
import BoxList from './components/pages/BoxList';

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
        path: 'box',
        element: <BoxList />,
      },
      {
        path: 'qna/:id',
        element: <Qna />,
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
