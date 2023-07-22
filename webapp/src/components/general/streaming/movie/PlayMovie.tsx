import React from 'react';
import ReactPlayer from 'react-player';
import video from '../../../../../assets/videos/Transformers_Rise_of_the_Beasts.mkv';

function PlayMovie({ movie_url } : { movie_url?: string }) {
  return (
    <div>
    <ReactPlayer url={video} playing={false} controls={true} />
    </div>
  );
}

export default PlayMovie;
