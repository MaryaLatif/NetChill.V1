import React from 'react';
import Arrow from '../arrow/Arrow';

type Props = {
  isArrowLeftVisible: boolean,
  isArrowRightVisible: boolean,
  onClickArrowRight: ()=>void,
  onClickArrowLeft: ()=>void,
  children: React.ReactNode,
};
function Slider({
  isArrowLeftVisible, isArrowRightVisible, onClickArrowRight, onClickArrowLeft, children,
} : Props) {
  return (
    <div>
      {
        isArrowLeftVisible
        && <Arrow orientation={'left'} onClick={onClickArrowLeft}/>
      }
      {children}
      {
        isArrowRightVisible
        && <Arrow orientation={'right'} onClick={onClickArrowRight}/>
      }
    </div>
  );
}

export default Slider;
