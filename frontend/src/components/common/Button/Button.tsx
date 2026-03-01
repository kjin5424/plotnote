import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'ghost' | 'primary' | 'accent' | 'outline' | 'danger' | 'icon' | 'add';

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  ghost:   'btn',
  primary: 'btn--primary',
  accent:  'btn--accent',
  outline: 'btn--outline',
  danger:  'btn--danger',
  icon:    'btn--icon',
  add:     'btn-add',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  sm?:        boolean;
  accentAdd?: boolean;
  children?:  ReactNode;
}

export default function Button({ variant = 'ghost', sm, accentAdd, className, children, ...rest }: ButtonProps) {
  const cls = [
    VARIANT_CLASS[variant],
    sm         && 'btn--sm',
    accentAdd  && 'btn-add--accent',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
