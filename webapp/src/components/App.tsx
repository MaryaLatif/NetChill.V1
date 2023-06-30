import React, { useMemo } from 'react';
import '../../public/assets/css/app.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';
import Row from './layout/Row';
import TopOfMoviesByGenre from '../services/sample/movie/TopMoviesByGenre';

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
          element: <div>
            <Row title={'NETFLIX ORIGINALS'} fetchMovies={TopOfMoviesByGenre(28)} isLargerRow={true}/>
          </div>,
        },
      ],
    },
  ]), []);

  logger.info('Render App');
  return <RouterProvider router={router}/>;
}
