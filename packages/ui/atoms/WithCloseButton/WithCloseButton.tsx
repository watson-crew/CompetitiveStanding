import { WithDefaultProps } from "../../types";
import { twMerge } from 'tailwind-merge'
import { IoMdCloseCircle } from 'react-icons/io'

type CloseButtonProps = WithDefaultProps<{
  buttonSize?: 's' | 'm' | 'l'
  onClose: () => void
}>

function CloseButton({  onClose, className }: CloseButtonProps) {
  return <button
      className={twMerge("rounded-full absolute -top-3 -right-3", className)}
      onClick={onClose} 
      ><IoMdCloseCircle className="fill-slate-300 hover:fill-slate-500 transition duration-300" size={30} /></button>
}

type WithCloseButtonProps = CloseButtonProps & {
  children: React.ReactNode
}

export default function WithCloseButton({ buttonSize = 'm', onClose, children, className} : WithCloseButtonProps) {

  return <section className="relative">
    <CloseButton buttonSize={buttonSize} onClose={onClose} className={className} />
    {children}
  </section>

}
