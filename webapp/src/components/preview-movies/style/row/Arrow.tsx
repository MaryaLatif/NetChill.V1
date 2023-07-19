import React from 'react';
import '../../../../../public/assets/css/arrow.css';
import classNames from 'classnames';

type Props = {
  left?: boolean,
  right?: boolean,
  img: string,
  onClick: ()=> void
};
function Arrow({
  left, right, img, onClick,
} : Props) {
  return (
    <div className={classNames('arrow', { arrow_right: right }, { arrow_left: left })} onClick={onClick}>
      <img src={img} alt={'arrow next'} className={'arrow_img'}/>
    </div>
  );
}

export default Arrow;
