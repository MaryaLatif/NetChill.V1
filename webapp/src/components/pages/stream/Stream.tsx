import React, { useEffect } from 'react';
import '../../../../assets/scss/components/general/streaming/stream/stream.scss';
import { getGlobalInstance } from 'plume-ts-di';
import StreamService from '../../../services/streaming/StreamService';

function Stream({ mediaName }:{ mediaName: string }) {
  const streamService = getGlobalInstance(StreamService);

  useEffect(() => {
    const video = streamService.getMediaVideo();
    console.log(`TEST : ${video}`);
  }, []);

  return (
    <div className="stream-container">
      <video id="videoPlayer" width="50%" controls muted={true} autoPlay>
        <source src="" type="video/mkv"/>
      </video>
    </div>
  );
}

export default Stream;
