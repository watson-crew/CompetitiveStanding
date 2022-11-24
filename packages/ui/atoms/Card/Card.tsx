import { WithDefaultProps } from "../../types";
import { twMerge } from 'tailwind-merge'

export type CardProps = WithDefaultProps<{
  color?: string
  isFlex?: boolean
}>

export default function Card({ color = 'slate-100', className = '', children, isFlex = true} : CardProps) {

  return (
    <div className={twMerge(`${isFlex ? 'flex' : ''} rounded-xl p-8 md:p-4 bg-${color}`, className)}>
      {children}
    </div>
  )

}
