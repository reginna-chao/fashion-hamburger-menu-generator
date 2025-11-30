import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = 'secondary',
  size = 'medium',
  startIcon,
  endIcon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classNames = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    [(startIcon || endIcon) && styles.btnWithIcon],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} {...props}>
      {startIcon && <span>{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
}
