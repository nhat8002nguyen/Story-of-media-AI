import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-gradient-to-r from-primary-color-l to-primary-color-r px-4 text-sm font-medium text-white transition-colors hover:bg-gradient-to-l focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-primary-button',
        className,
      )}
    >
      {children}
    </button>
  );
}
