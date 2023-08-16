import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import ConfigurationService from '../../../../services/configuration/ConfigurationService';

const imageApiClient = getGlobalInstance(ConfigurationService);
function PosterBackground({ path, title, className }: { path: string, title: string, className?: string }) {
  const [imageBaseUrl, setImageBaseUrl] = useState<string>();

  useEffect(() => {
    imageApiClient.getConfiguration().then((result) => {
      setImageBaseUrl(result.imageBaseUrl);
    });
  }, []);

  return (
    <img
      className={`${className} ${title}`}
      src={imageBaseUrl + path}
      alt={title}
     />
  );
}

export default PosterBackground;
