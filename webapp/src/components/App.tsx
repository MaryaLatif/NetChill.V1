import React, { useMemo } from 'react';
import '../../assets/scss/app.scss';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';
import RenderMovies from './preview-movies/RenderMovies';
import Stream from './pages/stream/Stream';

const logger = new Logger('App');

export default function App() {
  const router = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: <Layout><Outlet/></Layout>,
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          element: <RenderMovies/>,
        },
        {
          path: 'stream',
          element: <Stream />,
        },
      ],
    },
  ]), []);

  logger.info('Render App');
  return <RouterProvider router={router}/>;
}
