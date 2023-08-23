import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import { Genre } from '../../../../api/types/MovieDbTypes';
import GenreService from '../../../../services/genre/GenreService';

type Props = {
  genreId: number[],
  className?: string,
};
function GenreList({ genreId, className } : Props) {
  const generalService = getGlobalInstance(GenreService);

  const [genres, setGenres] = useState<Genre[]>([]);
  const movieLoader = useLoader();

  function loadGenresByIds(ids: number[]) {
    // eslint-disable-next-line typescript-compat/compat
    movieLoader.monitor(generalService.getGenreById(ids)
      .then(setGenres));
  }

  useEffect(() => {
    loadGenresByIds(genreId);
  }, [genreId]);

  return (
    <div className={className}>
      <h4>Genre :</h4>
      {
        movieLoader.isLoaded
        && genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))
      }
    </div>
  );
}

export default GenreList;
