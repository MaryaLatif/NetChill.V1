import React from 'react';

function PosterBackground({ path, title, className }: { path: string, title: string, className?: string }) {
  const baseUrl: string = 'https://image.tmdb.org/t/p/original/';
  return (
    <img
      className={`${className} ${title}`}
      src={baseUrl + path}
      alt={title}
     />
  );
}

export default PosterBackground;
