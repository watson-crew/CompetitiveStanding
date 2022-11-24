import { WithDefaultProps } from "../../types";

type ButtonProps = WithDefaultProps<{
  text: string,
  disabled?: boolean
  onClick: () => void
}>

export default function Button({ text, onClick, disabled, className = '' }: ButtonProps) {
  return <button 
    type="button"
    disabled={disabled}
    className={`bg-slate-400 hover:bg-slate-200 h-16 px-8 rounded-xl ${className}`} onClick={onClick}
      >{ text }
  </button>;
}
