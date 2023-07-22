import React from 'react';
import classNames from 'classnames';
import '../../../../public/assets/css/row.css';

function RowLoading({ isLargerRow }: { isLargerRow?: boolean }) {
  const renderPosters = () => {
    const posters = [];
    for (let i = 0; i < 8; i++) {
      posters.push(
        <div
          key={i}
          className={classNames('row_poster_loading', { row_poster_large_loading: isLargerRow })}
        ></div>,
      );
    }
    return posters;
  };
  return (
    <div className="row_posters">
      {renderPosters()}
    </div>
  );
}

export default RowLoading;
