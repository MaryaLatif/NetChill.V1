import React from 'react';
import { ThumbsUp } from 'react-feather';
import MediaQuery from 'react-responsive';

const thousand: number = 1000;
const hundred: number = 100;

function Recommendation({ average }: { average: number }) {
  function formatRecommendation(avg: number) {
    return Math.round((avg * thousand) / hundred);
  }

  return (
    <p><MediaQuery minWidth={767}>Recommendation: </MediaQuery>
      <MediaQuery maxWidth={767}>
        <ThumbsUp className='thumbs-up'/>
      </MediaQuery>
      {formatRecommendation(average)}%</p>
  );
}

export default Recommendation;
