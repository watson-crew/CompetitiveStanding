import { WithDefaultProps } from "../../types";
import { twMerge } from 'tailwind-merge'

type WithScrollbarProps =  WithDefaultProps<{
  children: React.ReactNode
}>

export default function WithScrollbar({ children, className} : WithScrollbarProps) {

  const scrollbarClasses = twMerge("flex w-full space-x-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100", className)

  return (
    <section className={scrollbarClasses}>
        {children}
    </section>
  )
}
