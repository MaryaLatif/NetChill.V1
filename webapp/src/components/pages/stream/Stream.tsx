import React from 'react';
import '../../../../assets/scss/components/general/streaming/stream/stream.scss';
import { useParams } from 'react-router-dom';

function Stream() {
  const { movieId } = useParams();

  return (
    <div className="stream-container">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={`${window.location.protocol}//${window.location.host}/api/stream/video/${movieId}`}
             width='100%' height='100%' controls autoPlay>
      </video>
    </div>
  );
}

export default Stream;
