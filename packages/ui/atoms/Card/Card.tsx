import { WithDefaultProps } from "../../types";
import { twMerge } from 'tailwind-merge'

export type CardProps = WithDefaultProps<{
  color?: string
}>

export default function Card({ color = 'slate-100', className = '', children } : CardProps) {

  return (
    <div className={twMerge(`md:flex rounded-xl p-8 bg-${color}`, className)}>
      {children}
    </div>
  )

}
