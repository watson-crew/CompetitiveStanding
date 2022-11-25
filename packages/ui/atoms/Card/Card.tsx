import { WithDefaultProps } from "../../types";
import { twMerge } from 'tailwind-merge'

export type CardProps = WithDefaultProps<{
  color?: string
}>

export default function Card({ color = 'slate-100', className = '', children} : CardProps) {

  return (
    <div className={twMerge(`inline-block rounded-xl p-8 md:p-4 bg-${color}`, className)}>
      {children}
    </div>
  )

}
