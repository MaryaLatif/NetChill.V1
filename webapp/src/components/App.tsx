import { getGlobalInstance } from 'plume-ts-di';
import React, { useEffect, useMemo, useState } from 'react';
import '../../assets/scss/app.scss';
import MediaQuery from 'react-responsive';
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
import logoLong from '../../assets/icons/logo-long-netchill.png';
import '../../assets/scss/components/general/loading/loading.scss';

const logger = new Logger('App');

export default function App() {
  const { httpError } = useMessages();
  const configurationService = getGlobalInstance(ConfigurationService);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setShowLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimeout); // Nettoyer le timeout lors du démontage du composant
  }, []);

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
        {
          path: 'stream/serie/:serieId/season/:season/episode/:episode',
          element: <Stream />,
        },
      ],
    },
  ]), []);

  const configurationLoader = useLoader();

  useEffect(() => {
    configurationLoader.monitor(configurationService.loadConfiguration());
  }, []);

  if (configurationLoader.isLoading || showLoading) {
    return <div className="loading-logo">
      <MediaQuery maxWidth={767}>
        <img src={logo} alt="logo" />
      </MediaQuery>
      <MediaQuery minWidth={767}>
        <img src={logoLong} alt="logo" />
      </MediaQuery>
    </div>;
  }
  if (configurationLoader.error) {
    return <div>{httpError(configurationLoader.error)}</div>;
  }

  logger.info('Render App');
  return <RouterProvider router={router} />;
}
