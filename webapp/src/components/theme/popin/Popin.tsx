import React from 'react';
import '../../../../assets/scss/theme/popin/popin.scss';
import { XCircle } from 'react-feather';

export type PopinProps = {
  zIndex?: number,
  height?: string;
  width?: string;
  className?: string;
  children?: React.ReactNode;
  onClose?: ()=>void,
};

export function Popin({
  children, zIndex, height, width, onClose, className
}: PopinProps) {
  return (
    <div className={`popin ${className}`} style={{ zIndex: zIndex ?? 100 }}>`
      <div className="popin-container" style={{ height, width }}>
        <div className="cross">
          <XCircle className="cross__icon" onClick={onClose}/>
        </div>
        {children}
      </div>
    </div>
  );
}
