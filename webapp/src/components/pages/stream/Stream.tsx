import React from 'react';
import '../../../../assets/scss/components/general/streaming/stream/stream.scss';

function Stream({ mediaName }:{ mediaName: string }) {
  return (
    <div className="stream-container">
      <video id="videoPlayer" width="50%" controls muted={true} autoPlay>
        <source src="http://localhost:8080/api/stream/video/test" type="video/MP4"/>
      </video>
    </div>
  );
}

export default Stream;
