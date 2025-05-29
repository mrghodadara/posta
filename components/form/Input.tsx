import type { ReactNode } from 'react';
import React from 'react';
import { twJoin } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label prop
  error?: string; // Optional error message
  icon?: ReactNode;
}

const Input = ({ label, error, icon, ...input }: InputProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          htmlFor={input?.id}
          className="font-inter text-sm font-normal leading-5 text-gray-25"
        >
          {label}
        </label>
      )}

      <div>
        <div className="relative">
          <input
            {...input}
            className={twJoin(
              'w-full rounded-lg border bg-white py-3 pl-11 pr-3 font-inter text-sm leading-5 text-gray-25 shadow-input placeholder:text-gray-15 transition-all focus:outline-none focus:border-transparent focus:ring-1 focus:ring-blue-600 focus:ring-opacity-100',
              error ? 'border-red-600' : 'border-gray-200',
              input.className
            )}
          />

          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-15">
              {icon}
            </span>
          )}
        </div>

        {error && error && (
          <p className="font-inter text-xs font-medium leading-4 text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export { Input };
