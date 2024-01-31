import { getGlobalInstance } from 'plume-ts-di';
import { useEffect, useState } from 'react';
import * as React from 'react';
import '../../../../../assets/scss/components/style/serie.scss';
import { MoreHorizontal, PlayCircle, Plus } from 'react-feather';
import { Episode } from '../../../../api/types/MovieDbTypes';
import useLoader from '../../../../lib/plume-http-react-hook-loader/promiseLoaderHook';
import SerieService from '../../../../services/serie/SerieService';

type Props = {
  id_serie: number,
  season: number
}

function Episodes({ id_serie, season }: Props) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [episodesVisible, setEpisodesVisible] = useState(false);
  const episodeLoader = useLoader();
  const serieService = getGlobalInstance(SerieService);

  function handleClickSetVisible(){
    setEpisodesVisible(prevState => !prevState);
  }

  useEffect(() => {
    episodeLoader.monitor(serieService.getEpisodes(id_serie, season)
      .then(setEpisodes));
  }, [season]);

  return (
    <div className="episodes-container">
      <p className="season-infos season-button" onClick={handleClickSetVisible}>Saison {season} {!episodesVisible && '...'}</p>
      {
        episodesVisible &&
        episodes.map((episode) => (
          <div className='episode-container' key={episode.id}>
            <div className="episode-title">
              <h4>Episode {episode.episode_number}: {episode.name}</h4>
              <PlayCircle className="episode__icon-play" />
            </div>
            <p className="episode-overview">{episode.overview}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Episodes;
