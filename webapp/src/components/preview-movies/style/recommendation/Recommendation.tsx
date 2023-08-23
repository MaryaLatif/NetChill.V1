import React from 'react';

function Recommendation({ average } : { average: number }) {
  average = Math.round((average * 1000) / 100);
  return (
    <p>Recommendation : {average}%</p>
  );
}

export default Recommendation;
