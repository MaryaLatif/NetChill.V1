import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import ConfigurationService from '../../../../services/configuration/ConfigurationService';

function PosterBackground({ path, title, className }: { path: string, title: string, className?: string }) {
  const imageApiClient = getGlobalInstance(ConfigurationService).getConfiguration();

  return (
    <img
      className={`${className} ${title}`}
      src={imageApiClient?.imageBaseUrl + path}
      alt={title}
     />
  );
}

export default PosterBackground;
