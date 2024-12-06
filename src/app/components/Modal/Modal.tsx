import { Modal as ModalAnt } from 'antd';
import clsx from 'clsx';
import { type ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  title: string;
  className?: string;
  open?: boolean;
}
export const Modal = ({ children, className, open = true, title }: ModalProps) => {
  return (
    <ModalAnt
      centered
      title={title}
      open={open}
      className={clsx(
        'py-[48px] px-[32px] max-w-[384px] rounded-[6px] bg-[backgroundColorBase] shadow-myShadow',
        className
      )}
    >
      {children}
    </ModalAnt>
  );
};
