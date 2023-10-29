import React from 'react';
import '../../../../assets/scss/components/general/streaming/stream/stream.scss';
import { useParams } from 'react-router-dom';

function Stream() {
  const { movieId } = useParams();

  return (
    <div className="stream-container">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={`http://localhost:8080/api/stream/video/${movieId}`} width="50%" controls autoPlay>
      </video>
    </div>
  );
}

export default Stream;
