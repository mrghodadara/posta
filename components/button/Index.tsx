import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        'flex w-full items-center justify-center rounded-lg border bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2.5 text-center font-inter text-base font-medium leading-6 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:opacity-80 disabled:hover:shadow-lg',
        props?.className
      )}
    >
      {props?.children}
    </button>
  );
};

export { Button };
