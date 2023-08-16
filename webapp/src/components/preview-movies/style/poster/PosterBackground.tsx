import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import ImageService from '../../../../services/Image/ImageService';

const imageApiClient = getGlobalInstance(ImageService);
const baseUrl = imageApiClient.getImageBaseUrl();
function PosterBackground({ path, title, className }: { path: string, title: string, className?: string }) {
  return (
    <img
      className={`${className} ${title}`}
      src={baseUrl + path}
      alt={title}
     />
  );
}

export default PosterBackground;
