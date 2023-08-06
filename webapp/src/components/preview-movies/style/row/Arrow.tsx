import React from 'react';
import classNames from 'classnames';
import '../../../../../assets/scss/components/arrow.scss';
import { ChevronRight, ChevronLeft } from 'react-feather';

type Props = {
  left?: boolean,
  right?: boolean,
  onClick: ()=> void
};
function Arrow({
  left, right, onClick,
} : Props) {
  return (
    <div className={classNames('arrow', { 'arrow--right': right }, { 'arrow--left': left })} onClick={onClick}>
      {left ? <ChevronLeft color={'white'}/> : < ChevronRight color={'white'} /> }
    </div>
  );
}

export default Arrow;
