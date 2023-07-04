import React, { useMemo } from 'react';
import '../../public/assets/css/app.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';
import RenderMovies from "./first-page/RenderMovies";

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
      ],
    },
  ]), []);

  logger.info('Render App');
  return <RouterProvider router={router}/>;
}
