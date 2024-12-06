import { Button as AntButton, ConfigProvider } from 'antd';
import clsx from 'clsx';
import { type ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  htmlType?: 'submit' | 'reset' | 'button';
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  variant?: 'outlined' | 'solid';
  disabled?: boolean;
  color?: 'default' | 'primary' | 'danger';
  colorDefault?: 'black' | 'green';
  size?: 'large' | 'middle' | 'small';
}

export const Button = ({
  children,
  className,
  htmlType = 'button',
  onClick,
  variant = 'solid',
  disabled = false,
  color,
  size = 'middle',
  colorDefault,
  ...props
}: ButtonProps) => {
  return (
    <ConfigProvider
      wave={{ disabled: true }}
      theme={{
        components: {
          Button: {
            defaultBorderColor: colorDefault === 'green' ? 'var(--success-color)' : 'black',
            defaultHoverBorderColor: colorDefault === 'green' ? 'var(--success-color)' : 'black',
            defaultActiveBorderColor:
              colorDefault === 'green' ? 'var(--success-active-color)' : 'var(--black-active-color)',
            defaultColor: colorDefault === 'green' ? 'var(--success-color)' : 'black',
            defaultHoverColor: colorDefault === 'green' ? 'var(--success-color)' : 'black',
            defaultActiveColor: colorDefault === 'green' ? 'var(--success-active-color)' : 'var(--black-active-color)',
          },
        },
      }}
    >
      <AntButton
        color={color}
        variant={variant}
        onClick={onClick}
        htmlType={htmlType}
        disabled={disabled}
        className={clsx('h-[40px] w-full', className)}
        children={children}
        size={size}
        {...props}
      />
    </ConfigProvider>
  );
};
