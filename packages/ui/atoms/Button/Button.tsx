import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps } from "react";
import { WithDefaultProps } from "../../types";

type ButtonProps = WithDefaultProps<{
  text: string,
  disabled?: boolean,
  type?: any,
  onClick?: () => void
}>

export default function Button({ text, onClick, disabled, className='', type='button'}: ButtonProps) {
  return <button
    type={type}
    disabled={disabled}
    className={`relative shadow-md font-small my-5 py-2 px-4 text-white cursor-pointer bg-yellow-600 hover:bg-yellow-500 rounded text-lg text-center w-24  disabled:opacity-25 ${className}`} onClick={onClick}
      >{ text }
  </button>;
}
