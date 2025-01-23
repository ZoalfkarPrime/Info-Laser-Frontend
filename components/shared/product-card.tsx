import {cn} from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Name: React.FC<React.PropsWithChildren<Props>> = ({className, children}) => {
  return <div className={cn('', className)}>
    {children}
  </div>;
};
