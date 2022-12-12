import React, { ChangeEvent, OptionHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import Tooltip from '../../atoms/Tooltip/Tooltip';
import { WithDefaultProps } from '../../types';

type SelectInputProps = WithDefaultProps<{
  id: string;
  title: string;
  options: OptionHTMLAttributes<HTMLOptionElement>[];
  value: string | ReadonlyArray<string> | number | undefined;
  tooltipContent?: React.ReactElement;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}>;

export default function SelectInput({
  id,
  title,
  options,
  value,
  onChange,
  className,
  tooltipContent,
  required = false,
}: SelectInputProps) {
  return (
    <div className={twMerge(`mt-4`, className)}>
      <span className="mb-2 flex items-center">
        <label
          htmlFor={id}
          className="text-md block flex font-medium text-gray-900"
        >
          {title}
          {required && <span className="text-red-600">*</span>}
        </label>
        {tooltipContent && (
          <Tooltip className="ml-1" id={id}>
            {tooltipContent}
          </Tooltip>
        )}
      </span>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      >
        {options.map(({ value, label }) => (
          <option value={value} key={`option-${value}`}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
