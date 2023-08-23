import React from 'react';
import classNames from 'classnames';
import '../../../../../assets/scss/components/style/arrow/arrow.scss';
import { ChevronRight, ChevronLeft } from 'react-feather';

type Props = {
  orientation: 'left' | 'right',
  onClick: ()=> void
};
function Arrow({
  orientation, onClick,
} : Props) {
  return (
    <div className={classNames('arrow',
      { arrow__right: orientation === 'right' },
      { arrow__left: orientation === 'left' })}
         onClick={onClick}>
      {orientation === 'left' ? <ChevronLeft className='arrow__icon'/> : < ChevronRight className='arrow__icon' /> }
    </div>
  );
}

export default Arrow;
