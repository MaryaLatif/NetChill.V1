import React from 'react';
import { Production } from '../../../../api/types/MovieDbTypes';
import RowLoading from '../../../general/loading/RowLoading';
import '../../../../../public/assets/css/row.css';
import '../../../../../public/assets/css/arrow.css';
import '../../../../../public/assets/css/top-row.css';
import Player from '../../../general/streaming/movie/Player';
import Arrow from './Arrow';

type Props = {
  title?: string,
  movieList: Production[],
  isDataLoading?: boolean
};

function TopRow({ movieList, isDataLoading }: Props) {
  function hundleClickArrowRight() {
    const slider = document.getElementById('top_posters');
    slider.scrollLeft += window.innerWidth;
  }

  function hundleClickArrowLeft() {
    const slider = document.getElementById('top_posters');
    slider.scrollLeft -= window.innerWidth;
  }

  return (
    <div className={'row'} >
      {
        isDataLoading
          ? <RowLoading/>

          : <div className={'row_posters'} id={'top_posters'}>
            {movieList.map((movie) => (
              <div key={movie.title}>
                <div className={'top_card'} style={{ width: `${window.innerWidth}px` }}>
                  <div>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <Player />
                  </div>
                  <img src={movie.backdrop_path} alt={movie.title} className={'top_img'}/>
                </div>
              </div>
            ))}
          </div>
      }
      <div className={'arrow_parent'} >
        <Arrow left={true} onClick={hundleClickArrowLeft}/>
        <Arrow right={true} onClick={hundleClickArrowRight}/>
      </div>
    </div>
  );
}

export default TopRow;
