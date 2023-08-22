import React from 'react';
import '../../../../assets/scss/components/general/streaming/stream/stream.scss';

function Stream({ mediaName }: { mediaName: string }) {
  return (
    <div className="stream-container">
      <video src="http://localhost:8080/api/stream/video/test" width="50%" controls autoPlay>
      </video>
    </div>
  );
}

export default Stream;
