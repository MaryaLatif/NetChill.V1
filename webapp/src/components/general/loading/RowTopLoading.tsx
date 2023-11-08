import React from 'react';
import classNames from 'classnames';
import '../../../../assets/scss/components/style/row/top-row.scss';

function RowTopLoading({ isLargerRow }: { isLargerRow?: boolean }) {
  const renderPosters = () => {
    const posters = [];
    for (let i = 0; i < 8; i += 1) {
      posters.push(
        <div
          key={i}
          className={classNames('row-top_poster_loading', { row_poster_large_loading: isLargerRow })}
        ></div>,
      );
    }
    return posters;
  };
  return (
    <div className="row__posters">
      {renderPosters()}
    </div>
  );
}

export default RowTopLoading;
