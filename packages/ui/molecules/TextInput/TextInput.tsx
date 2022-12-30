'use client';

import React, { useState, FocusEvent, ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import Text from '../../atoms/Text/Text';
import Tooltip from '../../atoms/Tooltip/Tooltip';
import { CommonIcons, WithDefaultProps } from '../../types';

type TextInputProps = WithDefaultProps<{
  id: string;
  title: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  validating?: boolean;
  isValid?: boolean;
  tooltipContent?: React.ReactElement;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errorMessage?: string;
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
  required = false,
  validating = false,
  errorMessage,
  isValid,
}: TextInputProps) {
  const [isEmptyError, setIsEmptyError] = useState(false);

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (required) {
      if (event.target.value.length === 0) {
        setIsEmptyError(true);
      } else {
        setIsEmptyError(false);
      }
    }
  };

  return (
    <div className={twMerge(`mt-4`, className)}>
      <span className="mb-2 flex items-center gap-1">
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
        {validating && <LoadingSpinner className="ml-1" size="xs" />}
        {isValid === true &&
          React.createElement(CommonIcons.Tick, {
            className: 'fill-green-800',
          })}
      </span>
      <input
        id={id}
        name={id}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={e => onChange(e)}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {(isEmptyError || !isValid) && (
        <Text
          id={`${id}-error`}
          type="p"
          className="mt-2 text-xs font-bold text-red-600"
        >
          {isEmptyError ? 'Required field cannot be empty' : errorMessage}
        </Text>
      )}
    </div>
  );
}
