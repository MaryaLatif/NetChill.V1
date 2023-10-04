import React from 'react';
import '../../../../assets/scss/_icons.scss';

type Props = {
  children: React.ReactNode,
  onClick?: ()=>void,
};

function IconButton({ children, onClick }: Props) {
  return (
    <button className={'icon-button'} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
