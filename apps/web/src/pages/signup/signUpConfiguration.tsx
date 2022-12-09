import { CreateUserPayload, Location } from 'schema';
import React, { OptionHTMLAttributes } from 'react';

type InputType = 'select' | 'text';

type SignUpInputProps<T extends InputType> = {
  inputType: T;
  id: string;
  label: string;
  required: boolean;
  tooltipContent?: React.ReactElement;
  field: keyof CreateUserPayload;
};

type TextInputProps = SignUpInputProps<'text'> & {
  maxLength: number;
};

type SelectInputProps = SignUpInputProps<'select'> & {
  options: OptionHTMLAttributes<HTMLOptionElement>[];
};

export const signUpConfigurationBuilder = (
  _locations: Location[],
  tooltipComponents: Partial<
    Record<keyof CreateUserPayload, React.ReactElement>
  >,
): (TextInputProps | SelectInputProps)[] => {
  return [
    {
      id: 'first-name',
      field: 'firstName',
      label: 'First Name',
      required: true,
      inputType: 'text',
      maxLength: 24,
    },
    {
      id: 'last-name',
      field: 'lastName',
      label: 'Last Name',
      required: true,
      inputType: 'text',
      maxLength: 24,
    },
    {
      id: 'memorable-id',
      field: 'memorableId',
      label: 'Memorable ID',
      required: true,
      inputType: 'text',
      maxLength: 3,
      tooltipContent: tooltipComponents['memorableId'],
    },
  ];
};
