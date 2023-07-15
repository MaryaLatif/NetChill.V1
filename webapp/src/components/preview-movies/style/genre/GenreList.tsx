import React, { useEffect, useState } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import { Genre } from '../../../../api/types/MovieDbTypes';
import GeneralService from '../../../../services/general/GeneralService';

function GenreList({ genreId }: { genreId: number[] }) {
  const generalService = getGlobalInstance(GeneralService);

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
    <div>
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
