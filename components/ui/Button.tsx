import Link from 'next/link';
import styles from './Button.module.css';
import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  icon?: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    loading = false,
    icon,
    ...rest
  } = props;

  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    loading ? styles['button--loading'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href) {
    const { href, external, ...linkRest } = rest as ButtonAsLink & { external?: boolean };

    if (external) {
      return (
        <a
          href={href}
          className={classNames}
          target="_blank"
          rel="noopener noreferrer"
          {...linkRest}
        >
          {icon && <span className={styles.icon}>{icon}</span>}
          <span>{children}</span>
        </a>
      );
    }

    return (
      <Link href={href} className={classNames} {...linkRest}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button
      type={buttonRest.type || 'button'}
      className={classNames}
      disabled={loading || buttonRest.disabled}
      aria-busy={loading ? 'true' : undefined}
      {...buttonRest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {icon && !loading && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
