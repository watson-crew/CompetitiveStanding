import React, { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import Tooltip from '../../atoms/Tooltip/Tooltip';
import { WithDefaultProps } from '../../types';

type TextInputProps = WithDefaultProps<{
  id: string;
  title: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  tooltipContent?: React.ReactElement;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}>;

export default function TextInput({
  id,
  title,
  value,
  onChange,
  placeholder,
  maxLength,
  className,
  tooltipContent,
}: TextInputProps) {
  return (
    <div className={twMerge(`mt-4`, className)}>
      <span className="mb-2 flex items-center">
        <label
          htmlFor={id}
          className="text-md block flex font-medium text-gray-900"
        >
          {title}
        </label>
        {tooltipContent && (
          <Tooltip className="ml-1" id={id}>
            {tooltipContent}
          </Tooltip>
        )}
      </span>
      <input
        id={id}
        name={id}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={e => onChange(e)}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}
