import React from 'react';

const thousand: number = 1000;
const hundred: number = 100;
function Recommendation({ average } : { average: number }) {
  function formatRecommendation(avg: number) {
    return Math.round((avg * thousand) / hundred);
  }

  return (
    <p>Recommendation : {formatRecommendation(average)}%</p>
  );
}

export default Recommendation;
