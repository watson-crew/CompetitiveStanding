import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge'
import { WithDefaultProps } from '../../types';

type TextInputProps = WithDefaultProps<{
  id: string,
  title: string,
  value: string,
  maxLength: number,
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
}>

export default function TextInput({ id, title, value, onChange, maxLength, className='' }: TextInputProps) {
  return (
    <div className={twMerge(`mt-4`, className)}>
      <label
        htmlFor={id}
        className='block mb-2 text-md font-medium text-gray-900'>
          {title}
        </label>
      <input 
        id={id}
        name={id}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e)}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
    </div>
  )
}