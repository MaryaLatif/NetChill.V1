import { getGlobalInstance } from 'plume-ts-di';
import React, { useEffect, useMemo } from 'react';
import '../../assets/scss/app.scss';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import useMessages from '../i18n/hooks/messagesHook';
import useLoader from '../lib/plume-http-react-hook-loader/promiseLoaderHook';
import ConfigurationService from '../services/configuration/ConfigurationService';
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';
import RenderMovies from './preview-movies/RenderMovies';
import Stream from './pages/stream/Stream';
import logo from '../../assets/icons/logo-netchill.png';
import '../../assets/scss/components/general/loading/loading.scss';

const logger = new Logger('App');

export default function App() {
  const { httpError } = useMessages();
  const configurationService = getGlobalInstance(ConfigurationService);

  const router = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: <Layout><Outlet /></Layout>,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <RenderMovies />,
        },
        {
          path: 'stream/:movieId',
          element: <Stream />,
        },
      ],
    },
  ]), []);

  const configurationLoader = useLoader();

  useEffect(() => {
    configurationLoader.monitor(configurationService.loadConfiguration());
  }, []);

  if (configurationLoader.isLoading) {
    return <div className='loading-logo'><img src={logo} alt='logo' /></div>;
  }
  if (configurationLoader.error) {
    return <div>{httpError(configurationLoader.error)}</div>;
  }

  logger.info('Render App');
  return <RouterProvider router={router} />;
}
